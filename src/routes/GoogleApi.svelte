<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher } from 'svelte';

	export let apiDiscoveryDocuments = [
		'https://www.googleapis.com/discovery/v1/apis/admin/directory_v1/rest',
		'https://chromepolicy.googleapis.com/$discovery/rest?version=v1'
	];

	const dispatch = createEventDispatcher();

	async function initialize() {
		await new Promise((resolve, reject) => {
			gapi.load('client', { callback: resolve, onerror: reject });
		});
		await gapi.client.init({}).then(async () => {
			for (const discoveryDoc of apiDiscoveryDocuments) {
				await gapi.client.load(discoveryDoc);
			}
		});
		dispatch('load');
	}

	if (browser) {
		initialize();
	}
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js" async defer></script>
</svelte:head>
