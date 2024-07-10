<script>
    import Alert from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalista} from '$lib/stores.js';
    
    
   
</script>

<Alert/>
{#if $kauppalista.tila == 'valmis'}
    <Kauppalista bind:asiat={$kauppalista.iteemit} />
{:else if $kauppalista.tila == 'lataa'}
    <div>Ladataan...</div>
{:else if $kauppalista.tila == 'virhe'}
    <div>Virhe: {$kauppalista.virhe}</div>
{/if}



