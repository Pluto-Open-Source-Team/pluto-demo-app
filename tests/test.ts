import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Home');
});

test('home page has expected h1', async ({ page }) => {
	await page.goto('/home');
	expect(await page.textContent('h1')).toBe('Home');
});

test('app page has expected h1', async ({ page }) => {
	await page.goto('/app');
	expect(await page.textContent('h1')).toBe('App');
});
