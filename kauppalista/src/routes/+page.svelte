<script>
    import {enhance} from '$app/forms';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {poistaKauppalistanTuote} from '$lib/api';

    export let data;
    export let form;   

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
        await asetaKauppalistanAsianValmis(LISTA_ID, teksti, valmis);
    }

</script>

<div class="komponentti">
    <h1>Kauppalista</h1>
    <Kauppalista 
    asiat={data.asiat} 
    on:poista-asia={poistaAsia}
    on:asia-valmis-muuttui={käsitteleValmisMuutos}
    />
    {#if form?.error}
    <p class="error">{form.error}</p>
    {/if}
    <form class="uusi" method="POST" action="?/lisääAsia" use:enhance>
        <label for="uusi-asia">Lisää uusi tuote:</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            id="uusi-asia" 
            name="asia" 
            type="text" 
            value={form?.asia ?? ''}
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


