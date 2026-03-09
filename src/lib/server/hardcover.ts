import { env } from '$env/dynamic/private';

export interface HardcoverBook {
	user_book_status: {
		id: number;
		status: string;
	};
	user_book_reads: {
		started_at: string | null;
		finished_at: string | null;
	}[];
	edition: {
		title: string;
		pages: number | null;
		image: {
			url: string;
		} | null;
	};
	book: {
		title: string;
		slug: string;
		contributions: {
			author: {
				name: string;
			};
		}[];
	};
}

export class HardcoverService {
	private apiKey: string;
	private apiUrl = 'https://api.hardcover.app/v1/graphql';

	constructor() {
		this.apiKey = env.HARDCOVER_API_KEY || '';

		if (!this.apiKey) {
			console.warn('HARDCOVER_API_KEY is not defined in environment variables');
		}
	}

	private async query(query: string, variables: any = {}) {
		if (!this.apiKey) {
			throw new Error('HARDCOVER_API_KEY is not defined');
		}

		const response = await fetch(this.apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.apiKey
			},
			body: JSON.stringify({ query, variables })
		});

		const result = await response.json();

		if (result.errors) {
			throw new Error(`Hardcover API Error: ${result.errors.map((e: any) => e.message).join(', ')}`);
		}

		return result.data;
	}

	async getCurrentlyReading(): Promise<HardcoverBook[]> {
		const query = `
			query GetCurrentlyReading {
				me {
					user_books(where: {status_id: {_in: [2, 3]}}) {
						user_book_status {
							id
							status
						}
						user_book_reads {
							started_at
							finished_at
						}
						edition {
							title
							pages
							image {
								url
								colors
							}
						}
						book {
							title
							slug
							contributions {
								author {
									name
								}
							}
						}
					}
				}
			}
		`;

		const data = await this.query(query);
		return data.me[0]?.user_books || [];
	}
}

export const hardcoverService = new HardcoverService();
