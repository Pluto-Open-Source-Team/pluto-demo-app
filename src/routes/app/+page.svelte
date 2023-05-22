<script lang="ts">
	import { PUBLIC_CLIENT_ID } from '$env/static/public';
	import { onMount } from 'svelte';
	import GoogleApi from '../GoogleApi.svelte';
	import { pageTitle, user } from '../stores';

	$pageTitle = 'Pluto Policy Manager // App';

	let client: TokenClient;
	onMount(() => {
		if ($user.email.length === 0) {
			google.accounts.id.prompt();
		}
		client = window.google.accounts.oauth2.initTokenClient({
			client_id: PUBLIC_CLIENT_ID,
			scope: [
				'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',
				'https://www.googleapis.com/auth/chrome.management.policy'
			].join(' '),
			callback: (tokenResponse) => {
				$user.accessToken = tokenResponse;
			}
		});
	});

	async function initGoogleApi() {
		gapi.client.setToken($user.accessToken);
		if (!gapi.client.getToken()) {
			client.requestAccessToken();
			gapi.client.setToken($user.accessToken);
		}
		const response = await gapi.client.directory.orgunits.list({
			customerId: 'my_customer',
			orgUnitPath: '/',
			type: 'ALL'
		});
		console.log(response.body);
	}
</script>

<GoogleApi on:load={initGoogleApi} />
