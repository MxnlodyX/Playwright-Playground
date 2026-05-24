import { test, expect } from '@playwright/test';


test("Read ENV File config in Playwright", async ({ page }) => {
    await page.goto(`${process.env.GitHub_URL}`);
    
    const name=  await page.locator('[itemprop="name"]').textContent();
    const namePrep = name?.trim();
    console.log(`Name is : ${namePrep}`);
    expect(namePrep).toBe('Testers Talk');

    const accountURL = await page.getByTestId('repositories').first().getAttribute('data-selected-links')
    console.log(`Attribute Value of URL is : ${accountURL}`);

});