<script>
    import {alert} from '../stores';
    import Asia from './Asia.svelte';

    export let asiat;

    let uusiAsiaTeksti = '';

    function luoId() {
        return crypto.randomUUID().substring(0, 15);
    }

    function lisääAsia(e) {
        const asia = {id: luoId(), teksti: uusiAsiaTeksti};    
        asiat = [...asiat, asia];
        $alert = `Lisätty kauppalistalle: ${uusiAsiaTeksti}`;
        uusiAsiaTeksti = '';
    }

    function poistaAsia(e) {
        $alert = `Poistettu kauppalistalta: ${e.detail.teksti}`;
        asiat = asiat.filter((x) => x.id !== e.detail.id);   
    }
    
    function käsitteleValmisMuutos(e) {
        const asia = e.detail;
        asia.valmis = !asia.valmis;
        asiat = asiat;
        if (asia.valmis)
        $alert = `Asetettu valmiiksi: ${asia.teksti}`;
        else
        $alert = `Asetettu keskeneräiseksi: ${asia.teksti}`;
    }

</script>

<div class="kauppalista">
    <h1>Kauppalista</h1>

    <form class="uusi" on:submit|preventDefault={lisääAsia}>
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <fieldset role="group">
            <!-- svelte-ignore a11y-autofocus -->
            <input 
                id="uusi-asia" 
                name="asia" 
                type="text" 
                placeholder="Lisää uusi tuote"
                bind:value={uusiAsiaTeksti}
                required 
                autofocus
            />
            <button>Lisää</button>
        </fieldset>
    </form>
    
    <ul>
        {#each asiat as asia (asia.id)}
            <Asia 
                {asia} 
                on:poista-asia={poistaAsia} 
                on:asia-valmis-muuttui={käsitteleValmisMuutos}
                />
        {/each}  
    </ul>

</div>



<style>
    .kauppalista {
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
   
    ul {
            color: greenyellow;
            font-size: 150%;
            background-color: orangered;
            padding: 10px;
        }
</style>