<script>
    import { haeKauppalistat } from "$lib/api";

    const listatPromise = haeKauppalistat();
</script>

<a href="/">Etusivu</a>

<h1>Kauppalistat</h1>

{#await listatPromise}
    <div arial-busy="true">Ladataan listoja...</div>
{:then listat}
<ul>
    {#each listat as lista}
        <li><a href="/listat/{lista.id}">{lista.nimi}</a></li>
    {/each}
</ul>
{:catch}
    <div>Virhe ladattaessa listoja</div>
{/await}