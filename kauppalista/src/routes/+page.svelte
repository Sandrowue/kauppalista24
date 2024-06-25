<script>
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {
            luoKauppalistanTuote,
            poistaKauppalistanTuote, 
            asetaKauppalistanAsianValmis,} from '$lib/api';
    import Alert from '$lib/components/Ilmoitus.svelte';

    export let data;
    let uusiAsiaTeksti = '';
    let uusiAsiaVirhe = null;
    
    async function lisääAsia(e) {
        const teksti = uusiAsiaTeksti.trim(); 
        const asia = {id: String(Math.random()), teksti};    
        uusiAsiaTeksti = '';
        data.asiat = [...data.asiat, asia];
        try {
            await luoKauppalistanTuote(data.LISTA_ID, teksti); 
            uusiAsiaVirhe = '';
        } catch(error) {
            uusiAsiaVirhe = error.message;
        }
    }

    async function poistaAsia(e) {
        const {teksti} = e.detail; // SAMA KUIN: const teksti = e.detail.teksti;
        const {LISTA_ID} = data; // SAMA KUIN: LISTA_ID = data.LISTA_ID 
        const poistoPromise = poistaKauppalistanTuote(LISTA_ID, teksti)
        data.asiat = data.asiat.filter((x) => x !== teksti);
        await poistoPromise;
    }
    
    async function käsitteleValmisMuutos(e) {
        const {teksti, valmis} = e.detail;
        console.log("Asia", teksti, "muuttui valmis-tilaan:", valmis);
        const {LISTA_ID} = data;
        await asetaKauppalistanAsianValmis(data.LISTA_ID, teksti, valmis);
    }

</script>

<Alert/>
<div class="komponentti">
    <h1>Kauppalista</h1>
    <Kauppalista 
    asiat={data.asiat} 
    on:poista-asia={poistaAsia}
    on:asia-valmis-muuttui={käsitteleValmisMuutos}
    />
    {#if uusiAsiaVirhe}
    <p class="error">{uusiAsiaVirhe}</p>
    {/if}
    <form class="uusi" on:submit={lisääAsia}>
        <label for="uusi-asia">Lisää uusi tuote:</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            id="uusi-asia" 
            name="asia" 
            type="text" 
            bind:value={uusiAsiaTeksti}
            required 
            autofocus/>
        <button>Lisää</button>
    </form>
</div>

<style>
    .komponentti {
        background-color: orange;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 20px;
    }
    h1 {
        color: green;
        font-size: 200%;
    }
   
    .uusi {
        background-color: orange;
        font-size: 150%;
    }
    label {
        display: block;
    }
    

</style>


