<script>
	import { goto } from '$app/navigation';
	import githubLogo from '$lib/assets/github-mark-white.svg';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import { pageTitle } from './stores';
</script>

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
				<img src={githubLogo} alt="Github logo" />
			</IconButton>
		</Section>
	</Row>
</TopAppBar>

<slot />

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>
