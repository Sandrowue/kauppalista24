import PocketBase from 'pocketbase';

export async function lataaKauppalista(listaId) {
    const pb = getPocketBase();
    console.log(`Ladataan lista ${listaId} palvelimelta...`)
    const tuotteet = pb.collection('kauppalistan_tuotteet')
    const response = await tuotteet.getList(1, 1000, {
        filter: pb.filter('lista = {:listaId}', {listaId}),
        sort: 'nro',
    });
    return response.items;
}

export async function luoKauppalistanTuote(listaId, asia) {
    if (!asia.teksti) throw Error('Teksti ei saa olla tyhjä');
    const pb = getPocketBase();
    const vanhaAsia = await haeKauppalistanTuetteet(pb, listaId, asia.teksti);
    if (vanhaAsia) throw Error('Sama asia oli jo listalla');       
    await pb
        .collection('kauppalistan_tuotteet')
        .create({...asia, lista: listaId});
}

export async function poistaKauppalistanTuote(asia) {
    const pb = getPocketBase();    
    await pb.collection('kauppalistan_tuotteet').delete(asia.id);
}

export async function päivitäKauppalistanAsia(asia) {
    const pb = getPocketBase();
    await pb.collection('kauppalistan_tuotteet').update(asia.id, asia)
}

export async function haeKauppalistanTuetteet(pb, listaId, teksti) {
    const tuotteet = pb.collection('kauppalistan_tuotteet');
    const response = await tuotteet.getList(1, 1, {
        filter: pb.filter('lista={:listaId} && teksti={:teksti}', {
            listaId,
            teksti,
        }),
    });
    // kolmisoperaattori: EHTO ? ARVO_JOS_EHTO_TOSI : ARVO_JOS_EHTO_EPÄTOSI
    return (response.items.length) ? response.items[0] : null;
}

function getPocketBase() {
    return new PocketBase('http://127.0.0.1:8090');
    // return new PocketBase('http://localhost:8090');
}