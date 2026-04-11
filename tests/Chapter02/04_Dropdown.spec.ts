import { test, expect, Page } from '@playwright/test';
test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('https://www.facebook.com/');
});

test('Handling Dropdown list in playwright', async ({ page }: { page: Page }) => {
    await page.getByRole('link', { name: 'Create new account' }).click();

    await page.getByLabel('Select day').locator('div').filter({ hasText: /^Day$/ }).click();
    await page.getByRole('option', { name: '27', exact: true }).click();

    await page.getByLabel('Select month').locator('div').filter({ hasText: /^Month$/ }).click();
    await page.getByRole('option', { name: 'December', exact: true }).click();

    await page.getByLabel('Select year').locator('div').filter({ hasText: /^Year$/ }).click();
    await page.getByRole('option', { name: '2004', exact: true }).click();
    


});