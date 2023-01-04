<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isNew, pageTitle } from './stores';

	$pageTitle = 'Pluto Policy Manager';
	onMount(async () => {
		if ($isNew) {
			$isNew = false;
			goto('/home');
		}
		if (!$isNew) {
			$isNew = false;
			goto('/app');
		}
	});
</script>
