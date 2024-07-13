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
    let vanhatIteemit = undefined;
    let peruKuuntelu = undefined;
    
    async function lataaKauppalistaJaAloitaMuutostenKuuntelu(setter) {
        try {
            const kauppalistanAsiat = await api.lataaKauppalista(listaId);
            vanhatIteemit = kauppalistanAsiat;
            setter({tila: 'valmis', iteemit: structuredClone(kauppalistanAsiat)});
        } catch(error) {
            console.error('Virhe:', error);
            setter({
                tila: 'virhe',
                virhe: 'Kauppalistaa ei saa ladattua',
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
                setter({
                    tila: 'valmis', 
                    iteemit: structuredClone(vanhatIteemit),
            });
        };     
        
        peruKuuntelu = await api.kuunteleMuutoksia(listaId, käsitteleMuutos);
    }

    
    const taustaStore = writable({tila: 'ladataan'}, (setter) => {
        lataaKauppalistaJaAloitaMuutostenKuuntelu(setter);
        return () => peruKuuntelu?.();
    });

    return {
        ...taustaStore,
        set(arvo) {
            taustaStore.set(arvo);
            käsitteleMuutokset(vanhatIteemit, arvo.iteemit, {
                luoUusi: (iteemi) => api.luoKauppalistanTuote(listaId, iteemi),
                päivitä: api.päivitäKauppalistanAsia,
                poista: api.poistaKauppalistanTuote,
            })
            vanhatIteemit = structuredClone(arvo.iteemit);           
        },
        
    };
}