import {
    createRouter,
    createWebHashHistory
} from "vue-router";

import { AlbumsPage } from "./pages/AlbumsPage.js";
import { AlbumPage } from "./pages/AlbumPage.js";
import { AlbumEditorPage } from "./pages/AlbumEditorPage.js";
import { AlbumScannerPage } from "./pages/AlbumScannerPage.js";
import { AlbumComparePage } from "./pages/AlbumComparePage.js";

const routes = [
    {
        path: "/",
        name: "albums",
        component: AlbumsPage
    },
    {
        path: "/album/:id",
        name: "album",
        component: AlbumPage
    },
    {
        path: "/album/:id/editar",
        name: "album-editor",
        component: AlbumEditorPage
    },
    {
        path: "/album/:id/escanear",
        name: "album-scanner",
        component: AlbumScannerPage
    },
    {
        path: "/album/:id/comparar",
        name: "album-compare",
        component: AlbumComparePage
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});