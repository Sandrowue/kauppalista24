<script>
    const jutut = [
        "Leipä",
        "Tomaatti",
        "Kurkku"
    ];
</script>

<h1>Kauppalista</h1>

<ul>
    {#each jutut as juttu}
    <li>{juttu}</li>
    {/each}
</ul>

