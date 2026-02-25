import {literalService} from '$lib/server/literal';
import type {PageServerLoad} from './$types';
import fs from 'node:fs';

export const load: PageServerLoad = async () => {
    try {
        if (fs.existsSync('./static/books.json')) {
            const cachedBooks = JSON.parse(fs.readFileSync('./static/books.json', 'utf8'));
            if (cachedBooks.cached + 1000 * 60 * 60 * 24 * 7 > Date.now()) {
                return cachedBooks;
            }
        }

        const myBookData = await literalService.getMyBooks();
        // download book covers
        const books = await Promise.all(
            myBookData.myReadingStates
                .filter(rs => rs.status === 'FINISHED' || rs.status === 'IS_READING')
                .map(rs => ({
                    readingState: {
                        status: rs.status,
                        createdAt: rs.createdAt
                    },
                    ...rs.book
                }))
                .sort((a, b) => new Date(b.readingState.createdAt).getTime() - new Date(a.readingState.createdAt).getTime())
                .map(async book => {
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
                        } catch (error) {}
                    } else if (!book.cover) {

                    } else {
                        book.cover = coverPath.replace('./static/', '/');
                    }
                    return { ...book};
        })).then((result) => {
            // store result in json
            fs.writeFileSync('./static/books.json', JSON.stringify({ books: result, cached: Date.now()}, null, 2));
            return result;
        });

        return {
            books
        };
    } catch (error) {
        console.error('Failed to load books from Literal:', error);
        return {
            books: [],
            error: 'Failed to load books'
        };
    }
};
