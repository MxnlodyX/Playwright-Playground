// run command " npx playwright codegen " for using code generator

import { test, expect } from '@playwright/test';

test('Codegen test case', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('Playtwright by testers talk');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');
    await page.locator('a').filter({ hasText: 'videos' }).first().click();
    await expect(page.locator('#header-description')).toContainText('Playwright by Testers Talk ✅');
    await page.close();
});
