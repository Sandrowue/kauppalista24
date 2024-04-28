<script>
    import Asia from './Asia.svelte';

    export let asiat;
</script>

<ul>
    {#each asiat as asia}
        <Asia tektsti={asia} on:poista-asia />
   
    {/each}  
</ul>

<style>
    ul {
            color: greenyellow;
            font-size: 150%;
            background-color: orangered;
        }
</style>