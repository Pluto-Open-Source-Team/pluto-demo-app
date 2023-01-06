import { writable as localStoreWritable } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export const pageTitle = writable('Pluto Policy Manager');

export const user = localStoreWritable<User>('user', {
	email: '',
	familyName: '',
	givenName: '',
	name: '',
	avatarUrl: ''
});
export interface User {
	email: string;
	familyName: string;
	givenName: string;
	name: string;
	avatarUrl: string;
	accessToken?: string;
}
