import {togglService} from '$lib/server/toggl';
import type {PageServerLoad} from './$types';
import fs from 'node:fs';

export const load: PageServerLoad = async () => {
    try {
        if (fs.existsSync('./projects.json')) {
            const cachedProjects = JSON.parse(fs.readFileSync('./projects.json', 'utf8'));
            if (cachedProjects.cached + 1000 * 60 * 60 * 24 * 7 > Date.now()) {
                return cachedProjects;
            }
        }

        // Parallel laden von Projekten und Clients
        const [projects, clients] = await Promise.all([
            togglService.getProjects(),
            togglService.getClients()
        ]);

        // Clients zu Projekten mappen
        const projectsWithClients = projects.map(project => ({
            actual_hours: Math.min(200, project.actual_hours),
            client: clients.find(c => c.id === project.client_id)?.name
        }));

        const result = {
            projects: projectsWithClients,
            cached: Date.now()
        };

        fs.writeFileSync('./static/projects.json', JSON.stringify(result, null, 2));

        return result;
    } catch (error) {
        console.error('Failed to load projects from toggl:', error);
        return {
            projects: [],
            error: 'Failed to load books'
        };
    }
};
