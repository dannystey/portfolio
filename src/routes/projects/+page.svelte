<script lang="ts">
    import type {PageData} from './$types';
    import ProjectCity from '$lib/components/ProjectCity.svelte';

    let {data}: { data: PageData } = $props();
</script>

<div class="relative py-20 ">

    <div class="w-full max-w-4xl mx-auto px-4 absolute top-40 left-1/2 -translate-x-1/2 z-10">
        <h1 class="text-4xl font-black mb-12 text-center">Welcome to Project City</h1>

    </div>

    <ProjectCity projects={data.projects}> </ProjectCity>
</div>
<div class="pb-20 max-w-4xl mx-auto px-5 lg:px-0 space-y-8">
    <p class="text-center text-neutral-600">
        This is project city. Every building represents a paid project I have worked on. The height of the building corresponds to the actual hours spent on the project. Every floor represents 20 hours. but I have limited the building height to 10 floors.
    </p>
</div>