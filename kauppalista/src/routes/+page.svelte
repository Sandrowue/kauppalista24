<script>
    import Alert from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalistaPbStore} from '$lib/KauppalistaPbStore';

    const LISTA_ID = 'azydx1vjxm5yw56';

    export const kauppalista = kauppalistaPbStore(LISTA_ID);
</script>

<a href="/listat">Listojen hallinta</a>

<Alert/>
{#if $kauppalista.tila == 'valmis'}
    <Kauppalista bind:asiat={$kauppalista.iteemit} />
{:else if $kauppalista.tila == 'lataa'}
    <div>Ladataan...</div>
{:else if $kauppalista.tila == 'virhe'}
    <div>Virhe: {$kauppalista.virhe}</div>
{/if}



