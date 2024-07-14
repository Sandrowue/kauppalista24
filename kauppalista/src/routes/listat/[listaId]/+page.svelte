<script>
    import {kauppalistaPbStore} from '$lib/KauppalistaPbStore';

    export let data;

    const kauppalista = kauppalistaPbStore(data.listaId);
</script>

<div>
    <h1>Lista X</h1>
    {#if $kauppalista.tila == 'valmis'}
        {#each $kauppalista.iteemit as asia}
            <li>{asia.teksti}</li>   
        {/each}
    {/if}
</div>