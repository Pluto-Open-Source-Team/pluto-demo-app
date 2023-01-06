<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { pageTitle, user } from './stores';

	$pageTitle = 'Pluto Policy Manager';

	onMount(async () => {
		if ($user.email.length === 0) {
			goto('/home');
		}
		goto('/app');
	});
</script>
