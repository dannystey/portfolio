<script>
    import Button from '$lib/components/Button.svelte';
    import Glide from '@glidejs/glide';
    import { onMount } from 'svelte';

    import '@glidejs/glide/dist/css/glide.core.min.css';
    import '@glidejs/glide/dist/css/glide.theme.min.css';

    let glideElement;

    onMount(() => {
        const glide = new Glide(glideElement, {
            type: 'slider',
            perView: 3,
            gap: 20,
            bound: true,
            breakpoints: {
                1024: {
                    perView: 2
                },
                640: {
                    perView: 1
                }
            }
        });

        glide.mount();

        return () => {
            glide.destroy();
        };
    });
</script>

<div class="max-w-screen-xl relative mx-auto px-5 lg:px-12 my-20">
    <div class="grid grid-cols-1 mb-10">
        <h2 class="text-3xl mb-5 font-bold headline">My Network</h2>
        <p class="text-xl">Collaborators and partners I’m proud to recommend.</p>
    </div>

    <div class="glide relative pr-10 xl:pr-0" bind:this={glideElement}>
            <div class="bg-gradient-to-l from-80% from-white to-transparent z-10 absolute bottom-0 top-0 left-full w-screen"></div>
            <div class="bg-gradient-to-r from-80% from-white to-transparent z-10 absolute bottom-0 top-0 right-full w-screen"></div>
        <div class="glide__track !overflow-visible relative" data-glide-el="track">
            <ul class="glide__slides !overflow-visible">
                <li class="glide__slide max-w-[400px]">
                    <div class="aspect-[3/4] bg-neutral-100 rounded-2xl p-4 flex flex-col h-full">
                        <div class="w-full aspect-[4/3] overflow-hidden mb-4">
                            <img alt="Nicole Hackbarth" class="block w-full h-full object-cover rounded-2xl grayscale-100 hover:grayscale-0 duration-500 transition-all" src="/images/nicole.png" />
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
                </li>
                <li class="glide__slide max-w-[400px]">
                    <div class="aspect-[3/4] bg-neutral-100 rounded-2xl p-4 flex flex-col h-full">
                        <div class="w-full aspect-[4/3] overflow-hidden mb-4">
                            <img alt="Charlotte Altmann" class="block w-full h-full object-cover rounded-2xl grayscale-100 hover:grayscale-0 duration-500 transition-all" src="/images/charlotte.png" />
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
                </li>

                <li class="glide__slide max-w-[400px]">
                    <div class="aspect-[3/4] bg-neutral-100 rounded-2xl p-4 flex flex-col h-full">
                        <div class="w-full aspect-[4/3] overflow-hidden mb-4">
                            <img alt="Jan Bassen" class="block w-full h-full object-cover rounded-2xl grayscale-100 hover:grayscale-0 duration-500 transition-all" src="/images/jan.png" />
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
                </li>

                <li class="glide__slide max-w-[400px]">
                    <div class="aspect-[3/4] bg-neutral-100 rounded-2xl p-4 flex flex-col h-full">
                        <div class="w-full aspect-[4/3] overflow-hidden mb-4">
                            <img class="block w-full h-full object-cover rounded-2xl grayscale-100 hover:grayscale-0 duration-500 transition-all" src="/images/bernhard.jpeg" />
                        </div>
                        <div class="flex-1 items-start flex flex-col">
                            <span class="text-2xl font-bold mb-4">Bernhard</span>
                            <p>
                                Software Developer for .NET Solutions & SaaS
                            </p>
                            <div class="flex-1"></div>
                            <a href="https://qsp.app" target="_blank" rel="noopener">
                                <Button icon="external">To qsp.app</Button>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="glide__arrows mt-8 flex gap-2 max-xl:hidden" data-glide-el="controls">
            <button class="text-white hover:scale-95 hover:bg-neutral-800 transition-all absolute  z-20 top-1/2 right-full cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-neutral-600 -translate-x-5" data-glide-dir="<">
                <svg xmlns="http://www.w3.org/2000/svg" class="-translate-x-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="text-white hover:scale-95 hover:bg-neutral-800 transition-all absolute absolute z-20 top-1/2 left-full cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-neutral-600 translate-x-5" data-glide-dir=">">
                <svg xmlns="http://www.w3.org/2000/svg"  class="translate-x-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
        </div>
    </div>
</div>
