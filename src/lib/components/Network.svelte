<script>
    import Button from '$lib/components/Button.svelte';
</script>

<div class="max-w-screen-xl  relative mx-auto px-5 lg:px-12 my-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 mb-10">
        <h2 class="text-3xl mb-5 font-bold headline">My Network</h2>
        <p class="text-xl">Collaborators and partners I’m proud to recommend.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 gap-5">
        <div class="aspect-[3/4] bg-neutral-100 rounded-2xl p-4 flex flex-col">
            <div class="w-full aspect-[4/3] overflow-hidden mb-4">
                <img class="block w-full h-full object-cover rounded-2xl grayscale-100 hover:grayscale-0 duration-500 transition-all" src="/images/nicole.png" />
            </div>
            <div class="flex-1 items-start flex flex-col">
                <span class="text-2xl font-bold mb-4">Nicole</span>
                <p>
                    designer & founder PENTACOASTAL Studio
                </p>
                <div class="flex-1"></div>
                <a href="https://pentacoastal.studio" target="_blank" rel="noopener">
                    <Button icon="external">To pentacoastal.studio</Button>
                </a>
            </div>
        </div>
        <div class="aspect-[3/4] bg-neutral-100 rounded-2xl p-4 flex flex-col">
            <div class="w-full aspect-[4/3] overflow-hidden mb-4">
                <img class="block w-full h-full object-cover rounded-2xl grayscale-100 hover:grayscale-0 duration-500 transition-all" src="/images/charlotte.png" />
            </div>
            <div class="flex-1 items-start flex flex-col">
                <span class="text-2xl font-bold mb-4">Charlotte</span>
                <p>
                    structured growth consultant & founder of CSE Advisory
                </p>
                <div class="flex-1"></div>
                <a href="https://www.cse-advisory.com/" target="_blank" rel="noopener">
                    <Button icon="external">To cse-advisory.com</Button>
                </a>
            </div>
        </div>

        <div class="aspect-[3/4] bg-neutral-100 rounded-2xl p-4 flex flex-col">
            <div class="w-full aspect-[4/3] overflow-hidden mb-4">
                <img class="block w-full h-full object-cover rounded-2xl grayscale-100 hover:grayscale-0 duration-500 transition-all" src="/images/jan.png" />
            </div>
            <div class="flex-1 items-start flex flex-col">
                <span class="text-2xl font-bold mb-4">Jan</span>
                <p>
                    Former architect & Software Developer
                </p>
                <div class="flex-1"></div>
                <a href="https://www.linkedin.com/in/bassen/" target="_blank" rel="noopener">
                    <Button icon="external">To his LinkedIn</Button>
                </a>
            </div>
        </div>
    </div>
</div>
