import {literalService} from '$lib/server/literal';
import {hardcoverService} from '$lib/server/hardcover';
import type {PageServerLoad} from './$types';
import fs from 'node:fs';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async () => {
    try {
        let cacheData: any = null;
        if (fs.existsSync('./static/books.json')) {
            cacheData = JSON.parse(fs.readFileSync('./static/books.json', 'utf8'));
            if (cacheData.cached + 1000 * 60 * 60 * 24 * 2 > Date.now() && false) {
                return cacheData;
            }
        }

        let literalData: any = null;
        let filteredBookData = [];
        if (fs.existsSync('./static/literal.json')) {
             literalData = JSON.parse(fs.readFileSync('./static/literal.json', 'utf8'));
             filteredBookData = literalData.books || [];
        }

        console.log(env);
        if (env.HARDCOVER_API_KEY) {
            const hcBooks = await hardcoverService.getCurrentlyReading();
            const hcMappedBooks = hcBooks.map(hc => ({
                id: hc.book.slug,
                title: hc.edition.title || hc.book.title,
                slug: hc.book.slug,
                pageCount: hc.edition.pages || hc.book.pages,
                cover: hc.edition.image?.url,
                authors: hc.book.contributions.map(c => ({ name: c.author.name })),
                readingState: {
                    status: hc.user_book_status.id === 2 ? 'IS_READING' : 'FINISHED',
                    createdAt: hc.user_book_reads[0]?.started_at || new Date().toISOString()
                },
                readingDates: hc.user_book_reads.map(r => ({
                    started: r.started_at,
                    finished: r.finished_at
                })),
                gradientColors: hc.edition.image.colors // fallback colors
            }));

            filteredBookData = [...filteredBookData, ...hcMappedBooks];
        }
        filteredBookData.sort((a, b) => {
            const dateA = a.readingDates?.[0]?.started ? new Date(a.readingDates[0].started).getTime() : 0;
            const dateB = b.readingDates?.[0]?.started ? new Date(b.readingDates[0].started).getTime() : 0;
            
            return dateB - dateA;
        })

        for (const book of filteredBookData) {
            const coverPath = `./static/covers/cover-${book.id}.png`;
            if (book.cover && !fs.existsSync(coverPath)) {
                try {
                    const response = await fetch(book.cover);
                    if (!response || !response.ok) throw new Error(`Failed to download cover for ${book.title}`);

                    const coverBlob = await response.blob();
                    const coverArrayBuffer = await coverBlob.arrayBuffer();
                    const coverBuffer = Buffer.from(coverArrayBuffer);
                    fs.writeFileSync(coverPath, coverBuffer);
                    book.cover = coverPath.replace('./static/', '/');
                } catch (error) {
                    console.error(`Failed to download cover for ${book.title}:`, error);
                }
            } else if (book.cover) {
                book.cover = coverPath.replace('./static/', '/');
            }
        }

        // store result in json
        fs.writeFileSync('./static/books.json', JSON.stringify({ books: filteredBookData, cached: Date.now() }, null, 2));

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
