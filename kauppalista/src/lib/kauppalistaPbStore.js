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
    let peruKuuntelu = undefined;

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
        function käsitteleMuutos({action, record}) {
            const idx = vanhatIteemit.findIndex((x) => x.id === record.id);
            let muuttunut = false;
            if (['create', 'update'].includes(action) && idx === -1) {
                // Uusi tai päivitetty iteemi, jota ei ollut meidän listalla
                vanhatIteemit.push(record);
                muuttunut = true;       
            } else if (['create', 'update'].includes(action) && idx !== -1) {
                // Iteemi, joka oli meidän listalla
                vanhatIteemit[idx] = record;
                muuttunut = true;                 
            } else if (action === 'delete' && idx !== -1) {  
                // Iteemi poistunut, mutta löytyi vielä meidän listalta
                vanhatIteemit = [
                    ...vanhatIteemit.slice(0, idx),
                    ...vanhatIteemit.slice(idx + 1),
                ];
                muuttunut = true;         
            }
            if (muuttunut)
                taustaStore.set({
                    tila: 'valmis', 
                    iteemit: structuredClone(vanhatIteemit),
            });
        };     
        
        peruKuuntelu = await api.kuunteleMuutoksia(listaId, käsitteleMuutos);
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
            vanhatIteemit = structuredClone(arvo.iteemit);           
        },
        
    };
}