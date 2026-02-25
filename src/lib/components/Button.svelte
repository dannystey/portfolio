<script lang="ts">
    const { children, icon, ...rest } = $props();
</script>
<button {...rest} class="h-10 rounded-full bg-white border border-neutral-300 text-sm text-gray-800 py-2 pl-8 pr-6 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2">
    {@render children() }
    {#if icon === 'paperplane'}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    {/if}
    {#if icon === 'printer'}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
    {/if}
    {#if icon === 'clipboard'}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
    {/if}
    {#if icon === 'external'}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    {/if}

</button>
