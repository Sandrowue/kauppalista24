<script>
    import {enhance} from '$app/forms'

    export let data;
    export let form;   
</script>

<div class="komponentti">
    <h1>Kauppalista</h1>

    <ul>
        {#each data.asiat as asia}
        <li>
            <input type="checkbox" />
            {asia}
        </li>
        {/each}  
    </ul>
    {#if form?.error}
    <p class="error">{form.error}</p>
    {/if}
    <form class="uusi" method="POST" action="?/lisääAsia" use:enhance>
        <label for="uusi-asia">Lisää uusi tuote:</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            id="uusi-asia" 
            name="asia" 
            type="text" 
            value={form?.asia ?? ''}
            required 
            autofocus/>
        <button>Lisää</button>
    </form>
</div>

<style>
    .komponentti {
        background-color: orange;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 20px;
    }
    h1 {
        color: green;
        font-size: 200%;
    }
    ul {
        color: greenyellow;
        font-size: 150%;
        background-color: orangered;
    }
    li {
        list-style-type: none;
        
    }
    .uusi {
        background-color: orange;
        font-size: 150%;
    }
    label {
        display: block;
    }
    

</style>


