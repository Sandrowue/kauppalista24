<script>
    import Asia from './Asia.svelte';

    export let asiat;
</script>

<ul>
    {#each asiat as asia (asia.id)}
        <Asia {asia} on:poista-asia on:asia-valmis-muuttui/>
    {/each}  
</ul>

<style>
    ul {
            color: greenyellow;
            font-size: 150%;
            background-color: orangered;
        }
</style>