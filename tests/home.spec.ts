import { expect, test } from '@playwright/test';

test('home page has expected welcome message', async ({ page }) => {
	await page.goto('/home');
	await expect(page.getByText('Welcome!')).toBeVisible();
});
