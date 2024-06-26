<script>
    import {alert} from '../stores.js';
</script>

{#if $alert}
    <button on:click={() => ($alert = '')}>
        {$alert}
    </button>
{/if}

<style>
    button {
        position: fixed;
        cursor: pointer;
        margin-right: 1.5rem;
        margin-left: 1.5rem;
        margin-top: 1rem;
        right: 0;
        display: flex;
        align-items: center;
        border-radius: 0.2rem;
        background-color: #565656;
        color: #fff;
        font-weight: 700;
        padding: 0.5rem 1.4rem;
        font-size: 1.5rem;
        z-index: 100;
        opacity: 95%;
    }
</style>