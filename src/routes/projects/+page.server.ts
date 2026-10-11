import {togglService} from '$lib/server/toggl';
import type {PageServerLoad} from './$types';
import fs from 'node:fs';
import path from 'node:path';

// Kept outside of ./static so the cache is not publicly served
const cacheFile = './.cache/projects.json';

export const load: PageServerLoad = async () => {
    try {
        if (fs.existsSync(cacheFile)) {
            const cachedProjects = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
            if (cachedProjects.cached + 1000 * 60 * 60 * 24 * 7 > Date.now()) {
                return cachedProjects;
            }
        }

        // Parallel laden von Projekten und Clients
        const [projects, clients] = await Promise.all([
            togglService.getProjects(),
            togglService.getClients()
        ]);

        // Nur die Stunden ausliefern, Kundennamen bleiben auf dem Server
        const result = {
            projects: projects.map(project => ({
                actual_hours: Math.min(200, project.actual_hours)
            })),
            clientCount: clients.filter(client => projects.some(project => project.client_id === client.id)).length,
            cached: Date.now()
        };

        fs.mkdirSync(path.dirname(cacheFile), {recursive: true});
        fs.writeFileSync(cacheFile, JSON.stringify(result, null, 2));

        return result;
    } catch (error) {
        console.error('Failed to load projects from toggl:', error);
        return {
            projects: [],
            clientCount: 0,
            error: 'Failed to load books'
        };
    }
};
