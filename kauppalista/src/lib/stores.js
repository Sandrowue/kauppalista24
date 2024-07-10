import {writable} from 'svelte/store';

import {kauppalistaPbStore} from './kauppalistaPbStore';

export const alert = writable('Tervetuloa kauppalistalle');

const LISTA_ID = 'azydx1vjxm5yw56';

export const kauppalista = kauppalistaPbStore(LISTA_ID);
