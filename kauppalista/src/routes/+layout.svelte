<svelte:head>
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.fluid.classless.min.css"
    />
</svelte:head>

<body>
    
    
<main style="border: 6px solid orangered">
<h1>Kauppalista-appi</h1>

    <slot/>

</main>
</body>

<style>
    main {
        max-width: 35em;
    }
</style>