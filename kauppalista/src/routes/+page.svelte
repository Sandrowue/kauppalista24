<script>
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import Alert from '$lib/components/Ilmoitus.svelte';
    import { kauppalista } from '$lib/stores.js';

    let uusiAsiaTeksti = '';
    let uusiAsiaVirhe = null;
    
    async function lisääAsia(e) {
        const teksti = uusiAsiaTeksti.trim(); 
        const asia = {id: String(Math.random()), teksti};    
        uusiAsiaTeksti = '';
        $kauppalista = [...$kauppalista, asia];
    }

    async function poistaAsia(e) {
        $kauppalista = $kauppalista.filter((x) => x.id !== e.detail.id)   
    }
    
    async function käsitteleValmisMuutos(e) {
        const asia = e.detail;
        asia.valmis = !asia.valmis;
        $kauppalista = $kauppalista;
    }
   
</script>

<Alert/>
<div class="komponentti">
    <h1>Kauppalista</h1>
    <Kauppalista 
    asiat={$kauppalista} 
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


