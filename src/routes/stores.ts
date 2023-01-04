import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const storedIsNew = JSON.parse((browser && localStorage.getItem('isNew')) || 'true') as boolean;
export const isNew = writable(storedIsNew);
isNew.subscribe((value) => {
	browser && localStorage.setItem('isNew', value === false ? 'false' : 'true');
});

const storedTheme = ((browser && localStorage.getItem('theme')) || 'light') as 'light' | 'dark';
export const theme = writable(storedTheme);
theme.subscribe((value) => {
	browser && localStorage.setItem('theme', value === 'dark' ? 'dark' : 'light');
});

export const pageTitle = writable('Pluto Policy Manager');
