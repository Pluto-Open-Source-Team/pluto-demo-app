import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const storedIsNew = JSON.parse((browser && localStorage.getItem('isNew')) || 'true') as boolean;
export const isNew = writable(storedIsNew);
isNew.subscribe((value) => {
	browser && localStorage.setItem('isNew', value === false ? 'false' : 'true');
});

export const pageTitle = writable('Pluto Policy Manager');
