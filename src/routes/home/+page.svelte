<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_CLIENT_ID } from '$env/static/public';
	import Button, { Label } from '@smui/button';
	import Paper, { Content, Subtitle, Title } from '@smui/paper';
	import { onMount } from 'svelte';
	import { pageTitle, user } from '../stores';

	$pageTitle = 'Pluto Policy Manager // Welcome';

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
				goto('/app');
			}
		});
	});
</script>

<div class="paper-container">
	<Paper>
		<Title>Welcome!</Title>
		<Subtitle>Demonstrating the features of our open source project Pluto</Subtitle>
		<Content>
			<p>
				If you have any questions, concerns, or would like to give us feedback, please find us on
				<a href="https://www.linkedin.com/company/pluto-open-source-team/">LinkedIn</a>,
				<a href="https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager">Github</a>, or via
				email at
				<a href="mailto:pluto-open-source-team@googlegroups.com"
					>pluto-open-source-team@googlegroups.com</a
				>.
			</p>
		</Content>
	</Paper>

	<Button
		disabled={$user.email.length === 0}
		on:click={() => client.requestAccessToken()}
		variant="raised"
		color="secondary"
	>
		<Label>Get started</Label>
	</Button>

	<Paper variant="unelevated">
		<Title>What does Pluto do?</Title>
		<Subtitle>And which permissions does it require?</Subtitle>
		<Content>
			<p>
				This app will visualise your organisational units from the Google Admin Console. To do this,
				we'll use <a href="https://developers.google.com/admin-sdk/directory/v1/guides"
					>Google's Directory API</a
				>, i.e. <code>directory.orgunit.readonly</code>).
			</p>
			<p>
				This tool simplifies the way how Chromebook Administrators can manage their policies and
				offers three main features: Importing, exporting and editing existing policies. Therefore
				the app will read policies (<code>.management.policy.readonly</code>) but also modify/write
				policies (<code>.management.policy</code>).
			</p>
			<p>There's no other way to use a more limited scope for this use case.</p>
		</Content>
	</Paper>

	<Paper variant="unelevated">
		<Title>API namespaces</Title>
		<Subtitle>available in the current version</Subtitle>
		<Content>
			<ul>
				<li>chrome.users.*</li>
				<li>chrome.users.apps.*</li>
				<li>chrome.users.appsconfig.*</li>
				<li>chrome.devices.*</li>
				<li>chrome.devices.kiosk.*</li>
				<li>chrome.devices.kiosk.apps.*</li>
				<li>chrome.devices.kiosk.appsconfig.*</li>
				<li>chrome.managedguest.*</li>
				<li>chrome.managedguest.apps.*</li>
				<li>chrome.networks.wifi.*</li>
				<li>chrome.networks.ethernet.*</li>
				<li>chrome.networks.vpns.*</li>
				<li>chrome.networks.certificates.*</li>
				<li>chrome.networks.globalsettings.*</li>
			</ul>
			<p>
				All API calls will happen between your Chrome tab and the Google APIs. There's no server or
				3rd party involved - all requests happen in the browser sandbox. This app can be used with
				your own client ID if you like.
			</p>
			<p>
				All data (access token + app settings) will be stored in the local storage of the browser.
				Conversely, no data will be stored anywhere else.
			</p>
		</Content>
	</Paper>
</div>

<style>
	.paper-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		padding: 24px 0;
	}

	@media (max-width: 1024px) {
		* :global(.smui-paper) {
			max-width: 80%;
		}
	}
	@media (min-width: 1024px) {
		* :global(.smui-paper) {
			max-width: 800px;
		}
	}
</style>
