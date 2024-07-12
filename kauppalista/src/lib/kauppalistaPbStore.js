import { writable } from "svelte/store";
import * as api from "./api";
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

    async function lataaKauppalista() {
        try {
            const kauppalistanAsiat = await api.lataaKauppalista(listaId);
            vanhatIteemit = kauppalistanAsiat;
            taustaStore.set({tila: 'valmis', iteemit: kauppalistanAsiat});
        } catch(error) {
            console.error('Virhe:', error);
            taustaStore.set({
                tila: 'virhe',
                virhe: 'Kauppalistaa ei saa ladattua'
            });
            return;
           
        }
        api.kuunteleMuutoksia(listaId, ({action, record}) => {
            if (action === 'create') {
                if (!vanhatIteemit.some((x) => x.id === record.id)) {
                    // Ei ollut sellaista iteemiä jonka id on record.id, joten record ei ollut vielä listassa.
                    vanhatIteemit.push(record);
                    taustaStore.set({tila: 'valmis', iteemit: vanhatIteemit});
                }
            } else if (action === 'update') {
                const idx = vanhatIteemit.findIndex((x) => x.id === record.id);
                if (idx !== -1) { // löytyi kistalla
                    vanhatIteemit[idx] = record;
                } else { // ei ollut listalla
                    vanhatIteemit.push(record);                   
                }
                taustaStore.set({tila: 'valmis', iteemit: vanhatIteemit});
            } else if (action === 'poisto', record) {
                const idx = vanhatIteemit.findIndex((x) => x.id === record.id);
                if (idx !== -1) {
                    // oli listalla
                    vanhatIteemit = [
                        ...vanhatIteemit.slice(0, idx),
                        ...vanhatIteemit.slice(idx + 1),
                    ];
                    taustaStore.set({tila: 'valmis', iteemit: vanhatIteemit});
                }
            }
        });        
    }

    lataaKauppalista();

    return {
        ...taustaStore,
        set(arvo) {
            taustaStore.set(arvo);
            console.log('Asetetaan arvoa');
            console.log('vanhat iteemit:', vanhatIteemit);
            console.log('uudet iteemit:', arvo.iteemit);
            käsitteleMuutokset(vanhatIteemit, arvo.iteemit, {
                luoUusi: (iteemi) => api.luoKauppalistanTuote(listaId, iteemi),
                päivitä: api.päivitäKauppalistanAsia,
                poista: api.poistaKauppalistanTuote,
            })
            vanhatIteemit = arvo.iteemit;
            
        }
    };
}