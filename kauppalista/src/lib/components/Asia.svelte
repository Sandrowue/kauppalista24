<script>
    import {createEventDispatcher} from "svelte";

    export let asia;
    

    const dispatch = createEventDispatcher();
</script>

<li>
    <input type="checkbox" 
    checked={asia.valmis}
    on:change={() => dispatch('asia-valmis-muuttui', asia)}
    />
    <span class={asia.valmis ? 'valmis' : ''}>
    {asia.teksti}
    </span>
    <button on:click={() => dispatch('poista-asia', asia)}>🗑️</button>
</li>

<style>
    li {
        list-style-type: none;       
    }
    .valmis {
        text-decoration: line-through;
        color: olive;
    }

</style>