import {
    inject,
    onMounted,
    ref
} from "vue";

export const AlbumsPage = {
    setup() {
        const albumService = inject("albumService");

        const albums = ref([]);
        const newAlbumName = ref("");
        const loading = ref(true);

        async function loadAlbums() {
            loading.value = true;

            try {
                albums.value = await albumService.listAlbums();
            } finally {
                loading.value = false;
            }
        }

        async function createAlbum() {
            const name = newAlbumName.value.trim();

            if (!name) {
                return;
            }

            await albumService.createAlbum(name, 980);

            newAlbumName.value = "";
            await loadAlbums();
        }

        onMounted(loadAlbums);

        return {
            albums,
            newAlbumName,
            loading,
            createAlbum
        };
    },

    template: `
        <section>
            <div class="page-heading">
                <div>
                    <h1>Meus Álbuns</h1>
                    <p>Gerencie suas coleções e encontre trocas.</p>
                </div>
            </div>

            <form
                class="new-album"
                @submit.prevent="createAlbum"
            >
                <input
                    v-model="newAlbumName"
                    placeholder="Nome do álbum"
                >

                <button type="submit">
                    Criar álbum
                </button>
            </form>

            <p v-if="loading">
                Carregando...
            </p>

            <div v-else-if="albums.length" class="album-grid">
                <article
                    v-for="album in albums"
                    :key="album.id"
                    class="album-card"
                >
                    <h2>⚽ {{ album.name }}</h2>

                    <div class="progress">
                        <div
                            class="progress-value"
                            :style="{
                                width:
                                    (
                                        album.statistics.pasted /
                                        album.statistics.total *
                                        100
                                    ) + '%'
                            }"
                        ></div>
                    </div>

                    <strong>
                        {{ album.statistics.pasted }}
                        /
                        {{ album.statistics.total }}
                    </strong>

                    <p>
                        {{ album.statistics.duplicates }}
                        repetidas
                    </p>

                    <router-link
                        :to="'/album/' + album.id"
                        class="button"
                    >
                        Abrir álbum
                    </router-link>
                </article>
            </div>

            <div v-else class="empty-state">
                <h2>Nenhum álbum cadastrado</h2>
                <p>Crie seu primeiro álbum para começar.</p>
            </div>
        </section>
    `
};