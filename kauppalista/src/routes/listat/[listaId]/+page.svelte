<script>
    import Alert from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalistaPbStore} from '$lib/KauppalistaPbStore';

    export let data;

    export const kauppalista = kauppalistaPbStore(data.listaId);
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
