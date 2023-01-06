<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_CLIENT_ID } from '$env/static/public';
	import jwt_decode from 'jwt-decode';
	import { createEventDispatcher } from 'svelte';
	import { user } from './stores';

	const dispatch = createEventDispatcher();

	function initialize() {
		google.accounts.id.initialize({
			client_id: PUBLIC_CLIENT_ID,
			auto_select: true,
			context: 'use',
			itp_support: true,
			callback: (credentialResponse) => {
				const responsePayload = jwt_decode(credentialResponse.credential) as {
					email: string;
					family_name: string;
					given_name: string;
					name: string;
					picture: string;
				};

				$user = {
					email: responsePayload.email,
					givenName: responsePayload.given_name,
					familyName: responsePayload.family_name,
					name: responsePayload.name,
					avatarUrl: responsePayload.picture
				};
				dispatch('credential', credentialResponse);
			}
		});
	}

	export function prompt() {
		google.accounts.id.prompt((promptMomentNotification) => {
			dispatch('prompt', promptMomentNotification);
		});
	}

	if (browser) {
		initialize();
	}
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>
