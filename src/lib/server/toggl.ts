import { env } from '$env/dynamic/private';

export interface TogglProject {
	id: number;
	workspace_id: number;
	client_id: number | null;
	name: string;
	is_private: boolean;
	active: boolean;
	at: string;
	created_at: string;
	server_deleted_at: string | null;
	color: string;
	billable: boolean | null;
	template: boolean | null;
	auto_estimates: boolean | null;
	estimated_hours: number | null;
	rate: number | null;
	rate_last_updated: string | null;
	currency: string | null;
	recurring: boolean;
	recurring_parameters: any | null;
	fixed_fee: number | null;
	actual_hours: number | null;
	actual_seconds: number | null;
	status: string;
	client?: TogglClient;
}

export interface TogglClient {
	id: number;
	wid: number;
	name: string;
	notes: string | null;
	at: string;
	creator_id: number;
	archived: boolean;
	external_reference: string | null;
	integration_ext_id: string | null;
	integration_ext_type: string | null;
	integration_provider: any | null;
	permissions: string[] | null;
	total_count: number | null;
}

export class TogglService {
	private apiToken: string;
	private workspaceId: number;
	private apiUrl = 'https://api.track.toggl.com/api/v9';

	constructor() {
		this.apiToken = env.TOGGL_API_TOKEN || '';
		this.workspaceId = env.TOGGL_WORKSPACE_ID || 0;

		if (!this.apiToken) {
			console.warn('TOGGL_API_TOKEN is not defined in environment variables');
		}
	}

	private getAuthHeader() {
		return {
			Authorization: `Basic ${Buffer.from(`${this.apiToken}:api_token`).toString('base64')}`
		};
	}

	/**
	 * List projects in a workspace.
	 * @param workspaceId ID of the workspace
	 */
	async getProjects(workspaceId: string | number): Promise<TogglProject[]> {
		if (!this.apiToken) {
			throw new Error('TOGGL_API_TOKEN is not defined');
		}

		const response = await fetch(`${this.apiUrl}/workspaces/${this.workspaceId}/projects`, {
			method: 'GET',
			headers: {
				...this.getAuthHeader(),
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Toggl API Error (${response.status}): ${errorText}`);
		}

		return await response.json();
	}

	/**
	 * List clients in a workspace.
	 * @param workspaceId ID of the workspace
	 */
	async getClients(workspaceId: string | number): Promise<TogglClient[]> {
		if (!this.apiToken) {
			throw new Error('TOGGL_API_TOKEN is not defined');
		}

		const response = await fetch(`${this.apiUrl}/workspaces/${this.workspaceId}/clients`, {
			method: 'GET',
			headers: {
				...this.getAuthHeader(),
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Toggl API Error (${response.status}): ${errorText}`);
		}

		return await response.json();
	}
}

export const togglService = new TogglService();
