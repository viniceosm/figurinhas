export const AlbumEditorPage = {
    template: `
        <section>
            <router-link :to="'/album/' + $route.params.id">
                ← Voltar
            </router-link>

            <h1>Gerenciar figurinhas</h1>

            <p>A grade das 980 figurinhas será criada aqui.</p>
        </section>
    `
};