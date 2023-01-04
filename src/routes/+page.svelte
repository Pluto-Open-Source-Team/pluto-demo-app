<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isNew, pageTitle } from './stores';

	$pageTitle = 'Pluto Policy Manager';
	onMount(async () => {
		if ($isNew) {
			goto('/home');
		}
		if (!$isNew) {
			goto('/app');
		}
	});
</script>
