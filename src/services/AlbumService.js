export class AlbumService {
    constructor(repository) {
        this.repository = repository;
    }

    async listAlbums() {
        const albums = await this.repository.findAll();

        return Promise.all(
            albums.map(async album => {
                const states = await this.repository.getStickerStates(album.id);

                return {
                    ...album,
                    statistics: this.calculateStatistics(album, states)
                };
            })
        );
    }

    async getAlbum(id) {
        const album = await this.repository.findById(id);

        if (!album) {
            return null;
        }

        const stickerStates =
            await this.repository.getStickerStates(id);

        return {
            ...album,
            stickerStates,
            statistics: this.calculateStatistics(album, stickerStates)
        };
    }

    async createAlbum(name, totalStickers = 980) {
        const now = new Date().toISOString();

        const album = {
            id: crypto.randomUUID(),
            name: name.trim(),
            totalStickers,
            format: "figuritas-980",
            createdAt: now,
            updatedAt: now
        };

        return this.repository.create(album);
    }

    async setStickerState(
        albumId,
        position,
        pasted,
        duplicateCount
    ) {
        const result = await this.repository.saveStickerState({
            albumId,
            position,
            pasted,
            duplicateCount: Math.max(0, duplicateCount),
            updatedAt: new Date().toISOString()
        });

        const album = await this.repository.findById(albumId);

        if (album) {
            await this.repository.update({
                ...album,
                updatedAt: new Date().toISOString()
            });
        }

        return result;
    }

    calculateStatistics(album, states) {
        const pasted = states.filter(state => state.pasted).length;

        const duplicates = states.reduce(
            (total, state) => total + state.duplicateCount,
            0
        );

        return {
            total: album.totalStickers,
            pasted,
            missing: album.totalStickers - pasted,
            duplicates
        };
    }
}