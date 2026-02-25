<script lang="ts">
    import {onMount} from 'svelte';
    import Books from '$lib/components/Books.svelte';
    import Button from '$lib/components/Button.svelte';
    import type {PageData} from './$types';

    let {data}: { data: PageData } = $props();
    let booksByYear: Record<string, any[]> = $state({});
    let years: string[] = $state([]);
    let showMore: boolean[] = $state([]);


    onMount(() => {
        data.books.forEach(book => {
            const year = new Date(book.readingState.createdAt).getFullYear();
            if (!booksByYear[year]) {
                booksByYear[year] = [];
            }
            booksByYear[year].push(book);
        });
        years = Object.keys(booksByYear).sort((a, b) => parseInt(b) - parseInt(a));
        showMore = years.map(() => false);
    })
</script>

<div class="max-w-screen-xl relative mx-auto mb-20">
    <div class="h-[60vh] bg-neutral-100 rounded-[4rem] lg:mb-12 relative">
        <Books books="{data.books}"></Books>
        <div class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap lg:translate-x-0 bottom-8 lg:left-12 bg-neutral-600 text-white px-3 py-1 rounded-full text-sm ">
            <span>Books I am currently reading</span>
        </div>
    </div>

    <div class="py-20 max-w-4xl mx-auto px-5 lg:px-0">
        <h1 class="text-4xl font-bold text-center headline mb-8">Books</h1>
        <p class="text-center text-neutral-600">
            A collection of books that I have read over the time. Most of these have served as bedtime stories to my
            children's, and if I’m being honest, I love the magic just as much as they do—there’s nothing quite like
            getting lost in a story and bringing every character to life with their own unique voice. as well.
        </p>
    </div>
    {showMore.map((value) => value.toString())}
    {#if booksByYear}
        {#each years as year, yearIndex}
            <h2 class="border-l pl-8! border-neutral-600  pb-8 relative">
                <div class="absolute left-0 -translate-x-1/2 w-5 h-5 bg-neutral-600 top-0 rounded"></div>
                <span class="-translate-y-1.5 block headline font-bold text-2xl">{year}</span>
            </h2>
            <div class="border-l pl-8! border-neutral-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 last:pb-0 px-5 lg:px-0">
                {#each booksByYear[year] as book, i}
                    {#if i < 6 || showMore[yearIndex]}
                    <div class="flex gap-4 p-4 rounded-2xl bg-neutral-100 ">
                        {#if book.cover}
                            <img src={book.cover} alt={book.title} class="w-24 h-36 object-cover rounded"/>
                        {/if}
                        <div class="flex flex-col justify-center">
                            <h3 class="font-bold text-lg leading-tight">{book.title}</h3>
                            <p class="text-neutral-600 text-sm mt-1">
                                {book.authors.map(a => a.name).join(', ')}
                            </p>
                        </div>
                    </div>
                    {/if}
                {/each}
                {#if booksByYear[year].length > 6}
                <div class="hidden md:block col-span-full ">
                    <Button onclick={() => showMore[yearIndex] = true}>Show more</Button>
                </div>
                {/if}

            </div>
        {/each}
    {:else if data.error}
        <p class="col-span-full text-center text-red-500">{data.error}</p>
    {/if}
</div>
