import {togglService} from '$lib/server/toggl';
import type {PageServerLoad} from './$types';
import fs from 'node:fs';

export const load: PageServerLoad = async () => {
    try {
        if (fs.existsSync('./static/projects.json')) {
            const cachedProjects = JSON.parse(fs.readFileSync('./static/projects.json', 'utf8'));
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
            ...project,
            client: clients.find(c => c.id === project.client_id)
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
