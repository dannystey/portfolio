<script lang="ts">
    import Hero from '$lib/components/Hero.svelte';
    import Clients from '$lib/components/Clients.svelte';
    import HighlightProjectTeaser from '$lib/components/HighlightProjectTeaser.svelte';
    import Network from '$lib/components/Network.svelte';
    import Services from '$lib/components/Services.svelte';
    import {fade} from 'svelte/transition';
</script>
<div transition:fade>

</div>
<Hero/>
<Clients></Clients>
<Services></Services>
<HighlightProjectTeaser></HighlightProjectTeaser>
<Network></Network>
