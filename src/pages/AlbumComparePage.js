export const AlbumComparePage = {
    template: `
        <section>
            <router-link :to="'/album/' + $route.params.id">
                ← Voltar
            </router-link>

            <h1>Comparar álbuns</h1>

            <p>Escaneie o QR Code do outro colecionador.</p>
        </section>
    `
};