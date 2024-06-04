import {fail} from '@sveltejs/kit';
import {lataaKauppalista, luoKauppalistanTuote} from '$lib/api';

const LISTA_ID = 'azydx1vjxm5yw56';

export async function load() {
    const asiat = await lataaKauppalista(LISTA_ID)
    return {asiat, LISTA_ID};
}

export const actions = {
    lisääAsia: async ({request}) => {
        const data = await request.formData();
        const asia = data.get('teksti')?.trim() ?? '';      
        try {
        luoKauppalistanTuote(LISTA_ID, asia); 
        } catch(error) {
            return fail(422, {error: error.message});
        }
    },
};