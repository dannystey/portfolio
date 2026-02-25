import { env } from '$env/dynamic/private';

export interface Book {
	id: string;
	slug: string;
	title: string;
	subtitle?: string;
	description?: string;
	isbn10?: string;
	isbn13?: string;
	language?: string;
	pageCount?: number;
	publishedDate?: string;
	publisher?: string;
	cover?: string;
	authors: {
		id: string;
		name: string;
	}[];
}

export interface ReadingState {
	status: 'WANT_TO_READ' | 'READING' | 'FINISHED' | 'DROPPED';
	book: Book;
}

export class LiteralService {
	private email: string;
	private password: string;
	private token: string | null = null;
	private apiUrl = 'https://api.literal.club/';

	constructor() {
		this.email = env.LITERAL_EMAIL || '';
		this.password = env.LITERAL_PASSWORD || '';

		if (!this.email || !this.password) {
			console.warn('LITERAL_EMAIL or LITERAL_PASSWORD is not defined in environment variables');
		}
	}

	private async login() {
		const query = `
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

		const response = await fetch(this.apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query,
				variables: { email: this.email, password: this.password }
			})
		});

		console.log('Login response status:', response.status);

		const result = await response.json();

		if (result.errors) {
			throw new Error(`Literal Login Error: ${result.errors.map((e: any) => e.message).join(', ')}`);
		}

		this.token = result.data.login.token;
		return this.token;
	}

	private async query(query: string, variables: any = {}) {
		if (!this.token) {
			await this.login();
		}

		const makeRequest = async (token: string) => {
			return await fetch(this.apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ query, variables })
			});
		};

		let response = await makeRequest(this.token!);
		let result = await response.json();

		// If token expired (assuming 401 or specific error message), try to login again
		if (result.errors && result.errors.some((e: any) => e.message.includes('unauthorized') || e.extensions?.code === 'UNAUTHENTICATED')) {
			await this.login();
			response = await makeRequest(this.token!);
			result = await response.json();
		}

		if (result.errors) {
			throw new Error(`Literal API Error: ${result.errors.map((e: any) => e.message).join(', ')}`);
		}

		return result.data;
	}

	/**
	 * Fetches books from the user's library.
	 * @param status Optional filter by reading status (e.g., 'READING', 'FINISHED')
	 * @param limit Number of books to fetch
	 * @param offset Offset for pagination
	 */
	async getMyBooks(
		status?: 'WANT_TO_READ' | 'READING' | 'FINISHED' | 'DROPPED',
		limit = 20,
		offset = 0
	): Promise<ReadingState[]> {
		const query = `
      	query myReadingStates {
			  myReadingStates {
			  	...ReadingStateParts
			  	book {
					...BookParts
				}
				__typename
			  }
			}

		fragment ReadingStateParts on ReadingState {
		  id
		  status
		  bookId
		  profileId
		  createdAt
		}

		fragment BookParts on Book {
		  id
		  slug
		  title
		  subtitle
		  description
		  isbn10
		  isbn13
		  language
		  pageCount
		  publishedDate
		  publisher
		  physicalFormat
		  cover
		  authors {
			...AuthorMini
			__typename
		  }
		  gradientColors
		  workId
		  __typename
		}
		
		fragment AuthorMini on Author {
		  id
		  name
		  slug
		  __typename
		}

    `;

		const data = await this.query(query);
		return data;
	}
}

export const literalService = new LiteralService();
