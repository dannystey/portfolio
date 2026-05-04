import {literalService} from '$lib/server/literal';
import {hardcoverService} from '$lib/server/hardcover';
import type {PageServerLoad} from './$types';
import fs from 'node:fs';
import {env} from '$env/dynamic/private';

// In production (adapter-node), static files are served from build/client/.
// STATIC_DIR can be set via env var; defaults to ./static for dev and ./client for prod.
const staticDir = process.env.STATIC_DIR ?? (fs.existsSync('./static') ? './static' : './client');

export const load: PageServerLoad = async () => {
    try {
        let cacheData: any = null;
        if (fs.existsSync(`${staticDir}/books.json`)) {
            cacheData = JSON.parse(fs.readFileSync(`${staticDir}/books.json`, 'utf8'));
            if (cacheData.cached + 1000 * 60 * 60 * 24 * 2 > Date.now()) {
                return cacheData;
            }
        }

        let literalData: any = null;
        let filteredBookData = [];
        if (fs.existsSync(`${staticDir}/literal.json`)) {
            literalData = JSON.parse(fs.readFileSync(`${staticDir}/literal.json`, 'utf8'));
            filteredBookData = literalData.books || [];
        }
        if (env.HARDCOVER_API_KEY) {
            const hcBooks = await hardcoverService.getCurrentlyReading();
            const bedtimeStoryIds = hcBooks.lists.find(l => l.name == 'Bedtime Stories')?.list_books.map(b => b.book_id);
            const hcMappedBooks = hcBooks.user_books.map(hc => {
                // check if Bedtime Story
                const bookId = hc.edition.book_id;
                return {
                    id: hc.book.slug,
                    isBedtimeStory: bedtimeStoryIds?.includes(bookId),
                    title: hc.edition.title || hc.book.title,
                    slug: hc.book.slug,
                    pageCount: hc.edition.pages || hc.book.pages,
                    cover: hc.edition.image?.url,
                    authors: hc.book.contributions.map(c => ({name: c.author.name})),
                    readingState: {
                        status: hc.user_book_status.id === 2 ? 'IS_READING' : 'FINISHED',
                        createdAt: hc.user_book_reads[0]?.started_at || new Date().toISOString()
                    },
                    readingDates: hc.user_book_reads.map(r => ({
                        started: r.started_at,
                        finished: r.finished_at
                    })),
                    gradientColors: hc.edition.image.colors // fallback colors
                }
            });

            filteredBookData = [...filteredBookData, ...hcMappedBooks];
        }
        filteredBookData.sort((a, b) => {
            const dateA = a.readingDates?.[0]?.started ? new Date(a.readingDates[0].started).getTime() : 0;
            const dateB = b.readingDates?.[0]?.started ? new Date(b.readingDates[0].started).getTime() : 0;

            return dateB - dateA;
        })

        for (const book of filteredBookData) {
            const coverPath = `${staticDir}/covers/cover-${book.id}.png`;
            if (book.cover && !fs.existsSync(coverPath)) {
                try {
                    const response = await fetch(book.cover);
                    if (!response || !response.ok) throw new Error(`Failed to download cover for ${book.title}`);

                    const coverBlob = await response.blob();
                    const coverArrayBuffer = await coverBlob.arrayBuffer();
                    const coverBuffer = Buffer.from(coverArrayBuffer);
                    fs.mkdirSync(`${staticDir}/covers`, {recursive: true});
                    fs.writeFileSync(coverPath, coverBuffer);
                    book.cover = `/covers/cover-${book.id}.png`;
                } catch (error) {
                    console.error(`Failed to download cover for ${book.title}:`, error);
                }
            } else if (book.cover) {
                book.cover = `/covers/cover-${book.id}.png`;
            }
        }

        // store result in json
        fs.writeFileSync(`${staticDir}/books.json`, JSON.stringify({books: filteredBookData, cached: Date.now()}, null, 2));

        return {
            books: filteredBookData
        };
    } catch (error) {
        console.error('Failed to load books:', error);
        return {
            books: [],
            error: 'Failed to load books'
        };
    }
};
