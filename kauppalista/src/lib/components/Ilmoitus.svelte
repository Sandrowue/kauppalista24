<script>
    import {onDestroy} from 'svelte';
    import {fly} from 'svelte/transition';
    // import {elasticOut} from 'svelte/easing';

    import {alert} from '../stores.js';

    export let piilotusViiveMs = 4000;
    let näkyvissä = false;
    let ajastimenKahva = undefined;

    function poistaIlmoitus() {
        $alert = '';
        näkyvissä = false;
    }

    function viestinTaiViiveenMuuttuessa(viesti, viiveMs) {
        clearTimeout(ajastimenKahva);
        if (!viesti) {
            näkyvissä = false;
        } else {
            näkyvissä = true;
            ajastimenKahva = setTimeout(poistaIlmoitus, viiveMs)
        }
    }    
    $: viestinTaiViiveenMuuttuessa($alert, piilotusViiveMs);

    onDestroy(() => clearTimeout(ajastimenKahva));
</script>

{#if näkyvissä}
    <button on:click={() => ($alert = '')} transition:fly={{
        delay: 250,
        duration: 1300,
        x: 0,
        y: -100,
        opacity: 0.5,
        }}>
        {$alert}
    </button>
{/if}

<style>
    button {
        position: fixed;
        cursor: pointer;
        margin-right: 1.5rem;
        margin-left: 1.5rem;
        margin-top: 2.8rem;
        right: 0;
        display: flex;
        align-items: center;
        border-radius: 0.2rem;
        border-color: yellowgreen;
        background-color: green;
        color: yellow;
        font-weight: 700;
        padding: 0.5rem 1.4rem;
        font-size: 1.5rem;
        z-index: 100;
        opacity: 95%;
    }
</style>