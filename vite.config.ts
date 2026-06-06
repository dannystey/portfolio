import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), glsl()],
	server: { port: 3300 },
	preview: { port: 3300 }
});
