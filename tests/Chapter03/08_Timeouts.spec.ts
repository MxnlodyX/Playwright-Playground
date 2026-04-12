import { test, expect } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import { time } from 'console';
chromium.use(stealth());
test("Timeout in Playwright Courses", async () => {
    test.setTimeout(1 * 60 * 1000); 
    const userDataDir = path.join(__dirname, 'google_user_data');
    const context = await chromium.launchPersistentContext(userDataDir, {
        args: [
            '--disable-blink-features=AutomationControlled', 
            '--no-sandbox'
        ]
    });
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
    await test.step("Search with keyword", async () => {
        await page.goto("https://google.com");
        const searchBar = page.getByRole('combobox', { name: 'ค้นหา' });
        await searchBar.click();
        await searchBar.pressSequentially('playwright by Testers Talk');
        await page.keyboard.press('Enter'); 
    });
    await test.step("Verify search results", async () => {
        await expect(page.getByRole('link', { name: /Playwright Typescript by Testers Talk/i }).first()).toBeVisible();
    });
    await test.step("Navigate to the course page", async () => {
        await page.getByRole('link', { name: /Playwright Typescript by Testers Talk/i }).first().click({timeout: 5000});
        await expect(page).toHaveTitle('Playwright Typescript by Testers Talk - YouTube', { timeout: 5000 });
        // Sleep(x sec)
        //await page.waitForTimeout(60000); 
    });
    await context.close();
});