<script lang="ts">
    import { page } from '$app/state';

    let { title, description }: { title: string; description: string } = $props();

    const site = 'https://steylish.de';
    let canonical = $derived(site + (page.url.pathname === '/' ? '' : page.url.pathname));
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Steylish" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content="{site}/images/danny-stey.png" />
    <meta name="twitter:card" content="summary" />
</svelte:head>
