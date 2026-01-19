<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<main class="bg-white text-neutral-800 min-h-screen m-2 overflow-x-hidden">
    <Header></Header>
    {@render children()}
    <Footer></Footer>
</main>
