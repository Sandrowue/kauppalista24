import PocketBase from 'pocketbase';

export async function lataaKauppalista(listaId) {
    const pb = getPocketBase();
    console.log(`Ladataan lista ${listaId} palvelimelta...`)
    const tuotteet = pb.collection('kauppalistan_tuotteet')
    const response = await tuotteet.getList(1, 1000, {
        filter: pb.filter('lista = {:listaId}', {listaId}),
        sort: 'nro',
    });
    return response.items.map((x) => x.tuote);
}

export async function luoKauppalistanTuote(listaId, teksti) {
    if (!teksti) throw Error('Teksti ei saa olla tyhjä');
    const pb = getPocketBase();
    console.log(`Lisätään listalle ${listaId} asia: ${teksti}`);
    const tuotteet = pb.collection('kauppalistan_tuotteet');

    const response = await tuotteet.getList(1, 1, {
        filter: pb.filter('lista={:listaId} && teksti={:teksti}', {
            listaId,
            teksti,
        })    
    });
    if (response.items.length) throw Error('Sama asia oli jo listalla');
        
    await tuotteet.create({lista: listaId, teksti});
}

function getPocketBase() {
    return new PocketBase('http://127.0.0.1:8090');
}