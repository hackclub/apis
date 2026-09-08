// @ts-check
import { defineConfig } from 'astro/config';
import vercelAdapter from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercelAdapter()
});
