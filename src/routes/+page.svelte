<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import Clients from '$lib/components/Clients.svelte';
    import HighlightProjectTeaser from '$lib/components/HighlightProjectTeaser.svelte';
    import Network from '$lib/components/Network.svelte';
    import Services from '$lib/components/Services.svelte';
    import References from '$lib/components/References.svelte';
    import {fade} from 'svelte/transition';
</script>

<Seo title="Danny Stey – Freelance Software Engineer & Interim Tech Lead | Steylish" description="Danny Stey (Steylish) is a freelance senior fullstack engineer and interim technical lead from Mühldorf, Germany: WebGL/Three.js experiences, technical leadership, digital modernization and hardening AI prototypes." />
<div transition:fade>

</div>
<Hero/>
<Clients></Clients>
<Services></Services>
<HighlightProjectTeaser></HighlightProjectTeaser>
<Network></Network>
