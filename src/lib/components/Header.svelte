<script>
    import Button from './Button.svelte';
</script>

<div class="print:hidden" >
    <div class="max-w-screen-xl mx-auto px-5 lg:px-8 relative">
        <div class="absolute top-5 left-5 z-20">
            <a href="/cv">
                <Button>CV</Button>
            </a>
        </div>
        <div class="button-animate text-transparent w-10 h-10 rounded-full absolute z-20 top-5 right-5">
            <a href="mailto:danny@steylish.de" class="bg-neutral-800 z-10 w-full h-full rounded-full absolute top-0 left-0 cursor-pointer hover:bg-neutral-700 text-neutral-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 mt-0.5 mr-0.5 "><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
            <div class="ring-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border rounded-full border-neutral-400 pointer-event-none"></div>
            <div class="ring-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border rounded-full border-neutral-400 pointer-event-none"></div>
            <div class="ring-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 border rounded-full border-neutral-400 pointer-event-none"></div>
        </div>
    </div>
</div>
