<script>
    import {createEventDispatcher} from "svelte";

    export let teksti;

    const dispatch = createEventDispatcher();

    function poistaAsia() {
        console.log("poista-asit kutsuttu tekstillä", teksti);
        dispatch('poista-asia', {teksti: teksti,});
    }
</script>
<li>
    <input type="checkbox" />
    {teksti}
    <button on:click>🗑️</button>
</li>

<style>
    li {
        list-style-type: none;
        
    }

</style>