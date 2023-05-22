import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export const pageTitle = writable('Pluto Policy Manager');

export const user = persisted<User>(
	'user',
	{
		email: '',
		familyName: '',
		givenName: '',
		name: '',
		avatarUrl: ''
	},
	{ storage: 'session' }
);
export interface User {
	email: string;
	familyName: string;
	givenName: string;
	name: string;
	avatarUrl: string;
	accessToken?: TokenResponse;
}
