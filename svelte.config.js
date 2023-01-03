import { vitePreprocess } from '@sveltejs/kit/vite';
import appengine from 'svelte-adapter-appengine';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: appengine()
	}
};

export default config;
