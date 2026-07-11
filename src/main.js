import { createApp } from "vue";

import { router } from "./router.js";

import { IndexedDbAlbumRepository }
    from "./repositories/IndexedDbAlbumRepository.js";

import { AlbumService }
    from "./services/AlbumService.js";

const repository = new IndexedDbAlbumRepository();
const albumService = new AlbumService(repository);

const App = {
    template: `
        <div class="app">
            <header class="app-header">
                <router-link to="/" class="brand">
                    🧩 Figuritas Manager
                </router-link>
            </header>

            <main class="app-content">
                <router-view />
            </main>
        </div>
    `
};

const app = createApp(App);

app.provide("albumService", albumService);

app.use(router);
app.mount("#app");