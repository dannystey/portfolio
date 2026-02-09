<script lang="ts">
    import Button from './Button.svelte';
</script>

<footer class="print:hidden">
    <div class="max-w-screen-xl text-neutral-600 relative mx-auto  ">
        <div class="lg:pt-[100px] bg-linear-to-b from-neutral-100 to-white px-5 lg:px-12 rounded-t-[4rem] space-y-8">
            <div class="text-center max-w-sm mx-auto pb-[100px]">
                <img src="/images/danny.png" alt="Danny Stey" class=" rounded-full overlfow-hidden w-32 mx-auto mb-5" />
                <h3 class="text-4xl mb-5 font-bold headline">Wanna talk about your next project?</h3>
                <a href="mailto:hi@steylish.de" target="_blank" rel="noopener">
                    <Button icon="paperplane">Get in touch</Button>
                </a>
            </div>
            <div class="border-t border-neutral-200 flex justify-between items-center py-5">
                <p class="text-sm">© {new Date().getFullYear()} Danny Stey. All rights reserved.</p>
                <nav class="text-sm">
                    <ul>
                        <li>
                            <a class="hover:opacity-75 transition-opacity" href="imprint">Imprint</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</footer>
