<script lang="ts">
    const { children } = $props();
</script>
<button class="h-10 rounded-full bg-white border border-neutral-600 text-sm text-gray-800 py-2 pl-8 pr-6 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2">
    {@render children() }
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
</button>
