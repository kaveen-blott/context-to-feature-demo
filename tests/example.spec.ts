import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/My App/);
  await expect(page.getByRole('heading', { name: 'Hello World' })).toBeVisible();
});
