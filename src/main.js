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
console.log(router.getRoutes());

await router.isReady();

console.log("currentRoute", router.currentRoute.value);
console.log("matched", router.currentRoute.value.matched);

app.mount("#app");