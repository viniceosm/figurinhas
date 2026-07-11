import Dexie from "dexie";

export const database = new Dexie("figuritas-manager");

database.version(1).stores({
    albums: "id, name, createdAt, updatedAt",

    stickerStates: `
        ++id,
        albumId,
        position,
        [albumId+position],
        pasted,
        duplicateCount
    `
});