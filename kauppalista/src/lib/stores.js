import {writable} from 'svelte/store';

export const alert = writable('Moi');

export const kauppalista = writable([
    {id: "a", teksti: "Paprika", valmis: false},
    {id: 'b', teksti: "Omena", valmis: true}
]);