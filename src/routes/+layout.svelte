<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import {fade, scale, fly} from 'svelte/transition';

    let { children, data } = $props();

    console.log('Layout data:', data);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<main class="bg-white text-neutral-800 min-h-screen m-2 overflow-x-hidden">
    <Header></Header>
    {#key data.pathname}
    <div in:fly={{x: 100, duration: 600, delay: 300  }} out:fly={{x:-100, duration: 400}}>
        {@render children()}
    </div>
    {/key}
    <Footer></Footer>
</main>
