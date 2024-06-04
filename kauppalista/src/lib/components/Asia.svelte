<script>
    import {createEventDispatcher} from "svelte";

    export let teksti;
    export let valmis;

    const dispatch = createEventDispatcher();
</script>

<li>
    <input type="checkbox" 
    checked={valmis}
    on:change={() => {
        valmis = !valmis;
        dispatch('asia-valmis-muuttui', {teksti, valmis})
    }}
    />
    <span class={valmis ? 'valmis' : ''}>
    {teksti}
    </span>
    <button on:click={() => dispatch('poista-asia', {teksti})}>🗑️</button>
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