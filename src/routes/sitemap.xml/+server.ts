import type { RequestHandler } from './$types';
import fs from 'node:fs';
import path from 'node:path';

export const GET: RequestHandler = async () => {
	const site = 'https://steylish.de';
	const routesDir = path.resolve('src/routes');

	const getRoutes = (dir: string, base = ''): string[] => {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		let routes: string[] = [];

		const hasPage = entries.some(
			(entry) => entry.isFile() && (entry.name === '+page.svelte' || entry.name === '+page.ts' || entry.name === '+page.server.ts')
		);

		if (hasPage && !base.includes('sitemap.xml')) {
			routes.push(base);
		}

		for (const entry of entries) {
			if (entry.isDirectory() && !entry.name.startsWith('(') && !entry.name.startsWith('[')) {
				const fullPath = path.join(dir, entry.name);
				const routePath = base ? `${base}/${entry.name}` : entry.name;
				routes = [...routes, ...getRoutes(fullPath, routePath)];
			}
		}

		return routes;
	};

	const pages = getRoutes(routesDir);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map((page) => {
		const url = page === '' ? site : `${site}/${page}`;
		return `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
	})
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
