/// <reference path="../pb_data/types.d.ts" />

// fires only for "users" and "articles" collections
onRecordBeforeCreateRequest((e) => {
    console.log('Meidän koodissa');
    if (!e.record.nro) {
        const muutAsiat = $app.dao().findRecordsByFilter(
                'kauppalistan_tuotteet',
                "lista = {:listaId} && nro != ''",
                '-nro',
                1,
                0,
                {listaId: e.record.get('lista')}
        );
        let suurinNumero = 0;
        if (muutAsiat.length) {
            suurinNumero = muutAsiat[0].get('nro') || 0;
        }
            const uusiNumero = suurinNumero + 1;
            e.record.set('nro', uusiNumero);          
        }
    }, 'kauppalistan_tuotteet');