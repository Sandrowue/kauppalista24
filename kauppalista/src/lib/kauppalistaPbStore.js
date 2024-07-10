import { writable } from "svelte/store";
import { lataaKauppalista, luoKauppalistanTuote, poistaKauppalistanTuote, päivitäKauppalistanAsia } from "./api";
import { käsitteleMuutokset } from "./pbUtils";

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


export function kauppalistaPbStore(listaId) {
    const taustaStore = writable({tila: 'ladataan'});

    let vanhatIteemit = undefined;

    lataaKauppalista(listaId)
        .then((kauppalistanAsiat) => {
            vanhatIteemit = kauppalistanAsiat;
            taustaStore.set({tila: 'valmis', iteemit: kauppalistanAsiat});
    })
    .catch((error) => {
        console.error('Virhe:', error);
        taustaStore.set({
            tila: 'virhe',
            virhe: 'Kauppalistaa ei saa ladattua'
        });
    });

    return {
        ...taustaStore,
        set(arvo) {
            taustaStore.set(arvo);
            console.log('Asetetaan arvoa');
            console.log('vanhat iteemit:', vanhatIteemit);
            console.log('uudet iteemit:', arvo.iteemit);
            käsitteleMuutokset(vanhatIteemit, arvo.iteemit, {
                luoUusi: (iteemi) => luoKauppalistanTuote(listaId, iteemi),
                päivitä: päivitäKauppalistanAsia,
                poista: poistaKauppalistanTuote,
            })
            vanhatIteemit = arvo.iteemit;
            
        }
    };
}