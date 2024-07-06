<script>
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import Alert from '$lib/components/Ilmoitus.svelte';
    import { kauppalista } from '$lib/stores.js';
    
    
   
</script>

<Alert/>
<Kauppalista 
    bind:asiat={$kauppalista} 
/>




