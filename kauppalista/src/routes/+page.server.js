
import {lataaKauppalista} from '$lib/api';

const LISTA_ID = 'azydx1vjxm5yw56';

export async function load() {
    const asiat = await lataaKauppalista(LISTA_ID)
    return {asiat, LISTA_ID};
}

