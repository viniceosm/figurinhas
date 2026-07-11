export const AlbumScannerPage = {
    template: `
        <section>
            <router-link :to="'/album/' + $route.params.id">
                ← Voltar
            </router-link>

            <h1>Escanear QR</h1>

            <p>O leitor html5-qrcode será adicionado aqui.</p>
        </section>
    `
};