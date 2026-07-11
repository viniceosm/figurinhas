export const AlbumsPage = {
    setup() {
        console.log("AlbumsPage carregou");

        return {
            albums: [],
            loading: false,
            newAlbumName: ""
        };
    },

    template: `
        <section style="padding:40px">
            <h1 style="color:white">FUNCIONOU 🎉</h1>
        </section>
    `
};