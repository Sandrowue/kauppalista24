<script>
    import { page } from '$app/stores';
    import Alert from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalistaPbStore} from '$lib/KauppalistaPbStore';

    export const kauppalista = kauppalistaPbStore($page.params.listaId);
</script>

<a href="/">Etusivu</a>

<Alert/>
{#if $kauppalista.tila == 'valmis'}
    <Kauppalista bind:asiat={$kauppalista.iteemit} />
{:else if $kauppalista.tila == 'lataa'}
    <div>Ladataan...</div>
{:else if $kauppalista.tila == 'virhe'}
    <div>Virhe: {$kauppalista.virhe}</div>
{/if}
