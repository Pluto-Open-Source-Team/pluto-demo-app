<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isNew } from './stores';

	onMount(async () => {
		if ($isNew) {
			goto('/home');
		}
		if (!$isNew) {
			goto('/app');
		}
	});
</script>
