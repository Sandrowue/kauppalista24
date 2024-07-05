import { writable } from "svelte/store";

/*
Kun ladataan plvelimelta:
{
    tila: 'lataa'
}

Kun ladattu:
{
    tila: 'valmis',
    iteemit: []
}

Jos virhe:
{
    tila: 'virhe',
    virhe: 'Virheen teksit',
}
*/

export function pbStore(kokoelmanNimi) {
    const taustaStore = writable({
        tila: 'lataa',
    });
    return {
        ...taustaStore,
        set(arvo) {
            taustaStore.set(arvo);
        }
    }
}