<script>
    import {createEventDispatcher} from 'svelte';
    import Asia from './Asia.svelte';

    export let asiat;
    let uusiAsiaTeksti = '';
    const dispatch = createEventDispatcher();
</script>

<div class="kauppalista">
    <h1>Kauppalista</h1>

    <ul>
        {#each asiat as asia (asia.id)}
            <Asia {asia} on:poista-asia on:asia-valmis-muuttui/>
        {/each}  
    </ul>

    <form 
        class="uusi" 
        on:submit={() => {
            dispatch('uusi-asia', {teksti: uusiAsiaTeksti.trim()});
            uusiAsiaTeksti = '';
        }}
    >

        <label for="uusi-asia">Lisää uusi tuote:</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            id="uusi-asia" 
            name="asia" 
            type="text" 
            bind:value={uusiAsiaTeksti}
            required 
            autofocus
        />
        <button>Lisää</button>
    </form>
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
    label {
        display: block;
    }
    ul {
            color: greenyellow;
            font-size: 150%;
            background-color: orangered;
        }
</style>