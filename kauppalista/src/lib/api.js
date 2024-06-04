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

export async function luoKauppalistanTuote(listaId, teksti) {
    if (!teksti) throw Error('Teksti ei saa olla tyhjä');
    const pb = getPocketBase();
    const tuotteet = await haeKauppalistanTuetteet(pb, listaId, teksti);
    if (tuotteet) throw Error('Sama asia oli jo listalla');       
    await pb.collection('kauppalistan_tuotteet').create({lista: listaId, /*tuote:*/ teksti});
}

export async function poistaKauppalistanTuote(listaId, teksti) {
    const pb = getPocketBase();    
    const tuote = await haeKauppalistanTuetteet(pb, listaId, teksti);   
    if (!tuote) return;
    await pb.collection('kauppalistan_tuotteet').delete(tuote.id);
}

export async function asetaKauppalistanAsianValmis(listaId, teksti, valmis) {
    const pb = getPocketBase();
    const asia = await haeKauppalistanTuetteet(pb, listaId, teksti);
    if (!asia) return;
    pb.collection('kauppalistan_tuotteet').update(
        asia.id, {valmis}
    )
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