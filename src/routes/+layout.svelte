<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import githubLogoWhite from '$lib/assets/github-mark-white.svg';
	import githubLogo from '$lib/assets/github-mark.svg';
	import IconButton from '@smui/icon-button';
	import List, { Graphic, Item, Text } from '@smui/list';
	import Menu from '@smui/menu';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import GoogleOneTap from './GoogleOneTap.svelte';
	import { pageTitle, user } from './stores';

	export const prerender = true;

	let darkMode: boolean;
	if (browser) {
		darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	let userMenu: Menu;
	function logout() {
		google.accounts.id.revoke($user.email, () => {
			$user = {
				email: '',
				familyName: '',
				givenName: '',
				name: '',
				avatarUrl: ''
			};
			goto('/home');
		});
	}
	function login() {
		google.accounts.id.prompt();
	}
</script>

<GoogleOneTap />

<TopAppBar variant="static" prominent={false} dense={false} color={'primary'}>
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={() => goto('/home')}>home</IconButton>
			<Title>{$pageTitle}</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="Settings">settings</IconButton>
			<IconButton class="material-icons" aria-label="Share">share</IconButton>
			<IconButton
				class="material-icons"
				aria-label="Go to Github"
				on:click={() => {
					window
						?.open('https://github.com/Pluto-Open-Source-Team/Pluto-Policy-Manager', '_blank')
						?.focus();
				}}
			>
				{#if darkMode}
					<img src={githubLogoWhite} alt="Github logo" />
				{:else}
					<img src={githubLogo} alt="Github logo" />
				{/if}
			</IconButton>
			{#if $user.email.length > 0}
				<IconButton
					on:click={() => userMenu.setOpen(true)}
					class="material-icons"
					aria-label="Your account"
				>
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={$user.avatarUrl} alt="Your profile picture" />
					<Menu bind:this={userMenu}>
						<List>
							<Item on:SMUI:action={logout}>
								<Graphic class="material-icons">logout</Graphic>
								<Text>Sign out</Text>
							</Item>
						</List>
					</Menu>
				</IconButton>
			{:else}
				<IconButton
					on:click={() => userMenu.setOpen(true)}
					class="material-icons"
					aria-label="Sign in"
				>
					login
					<Menu bind:this={userMenu}>
						<List>
							<Item on:SMUI:action={login}>
								<Graphic class="material-icons">login</Graphic>
								<Text>Sign in</Text>
							</Item>
						</List>
					</Menu>
				</IconButton>
			{/if}
		</Section>
	</Row>
</TopAppBar>

<slot />

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>
