import { database } from "../database/database.js";
import { AlbumRepository } from "./AlbumRepository.js";

export class IndexedDbAlbumRepository extends AlbumRepository {
    async findAll() {
        return database.albums
            .orderBy("updatedAt")
            .reverse()
            .toArray();
    }

    async findById(id) {
        return database.albums.get(id);
    }

    async create(album) {
        await database.albums.add(album);
        return album;
    }

    async update(album) {
        await database.albums.put(album);
        return album;
    }

    async delete(id) {
        await database.transaction(
            "rw",
            database.albums,
            database.stickerStates,
            async () => {
                await database.stickerStates
                    .where("albumId")
                    .equals(id)
                    .delete();

                await database.albums.delete(id);
            }
        );
    }

    async getStickerStates(albumId) {
        return database.stickerStates
            .where("albumId")
            .equals(albumId)
            .sortBy("position");
    }

    async saveStickerState(state) {
        const existing = await database.stickerStates
            .where("[albumId+position]")
            .equals([state.albumId, state.position])
            .first();

        if (existing) {
            await database.stickerStates.update(existing.id, state);
            return {
                ...existing,
                ...state
            };
        }

        const id = await database.stickerStates.add(state);

        return {
            id,
            ...state
        };
    }
}