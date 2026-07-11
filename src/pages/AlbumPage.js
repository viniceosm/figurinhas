import {
    inject,
    onMounted,
    ref
} from "vue";

import {
    useRoute
} from "vue-router";

export const AlbumPage = {
    setup() {
        const route = useRoute();
        const albumService = inject("albumService");

        const album = ref(null);
        const loading = ref(true);

        onMounted(async () => {
            try {
                album.value = await albumService.getAlbum(
                    route.params.id
                );
            } finally {
                loading.value = false;
            }
        });

        return {
            album,
            loading
        };
    },

    template: `
        <section>
            <p v-if="loading">Carregando...</p>

            <div v-else-if="album">
                <header class="album-heading">
                    <div>
                        <router-link to="/">
                            ← Meus álbuns
                        </router-link>

                        <h1>⚽ {{ album.name }}</h1>
                    </div>
                </header>

                <div class="statistics">
                    <article>
                        <span>Coladas</span>
                        <strong>
                            {{ album.statistics.pasted }}
                        </strong>
                    </article>

                    <article>
                        <span>Faltantes</span>
                        <strong>
                            {{ album.statistics.missing }}
                        </strong>
                    </article>

                    <article>
                        <span>Repetidas</span>
                        <strong>
                            {{ album.statistics.duplicates }}
                        </strong>
                    </article>
                </div>

                <nav class="album-actions">
                    <router-link
                        :to="'/album/' + album.id + '/editar'"
                        class="button"
                    >
                        Gerenciar figurinhas
                    </router-link>

                    <router-link
                        :to="'/album/' + album.id + '/escanear'"
                        class="button"
                    >
                        Escanear QR
                    </router-link>

                    <router-link
                        :to="'/album/' + album.id + '/comparar'"
                        class="button"
                    >
                        Comparar com colecionador
                    </router-link>
                </nav>
            </div>

            <p v-else>
                Álbum não encontrado.
            </p>
        </section>
    `
};