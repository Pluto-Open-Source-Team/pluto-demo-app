import { expect, test } from '@playwright/test';

test.describe('having visited already', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/app');
	});

	test('route "app" should be chosen', async ({ page }) => {
		await page.goto('/');
		await page.waitForURL('/app');
		expect(page.url()).toMatch(/.*\/app$/);
	});
});
