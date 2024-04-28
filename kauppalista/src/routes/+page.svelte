<script>
    import {enhance} from '$app/forms'
    import Kauppalista from '$/lib/components/Kauppalista.svelte';

    export let data;
    export let form;   

    function poistaAsia() {
        const params = e.detail;
        console.log('Kutsuttiin poist-asiaa parametrilla', params);
    }
</script>

<div class="komponentti">
    <h1>Kauppalista</h1>
    <Kauppalista asiat={data.asiat} on:poista-asia={poista-asia}/>
   
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


