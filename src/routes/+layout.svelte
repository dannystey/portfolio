<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<main class="bg-white text-white min-h-screen m-2">
    <Header></Header>
    {@render children()}
</main>
