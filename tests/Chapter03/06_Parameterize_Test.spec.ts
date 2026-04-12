import { test, expect, BrowserContext, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import path from 'path';
chromium.use(stealth());

let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
    console.log("Running before all test...");
    const userDataDir = path.join(__dirname, 'google_user_data');
    context = await chromium.launchPersistentContext(userDataDir, {
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox'
        ]
    });
    page = context.pages()[0];
})
test.beforeEach(async () => {
    await page.goto("https://google.com");
});

test.afterAll(async () => {
    await context.close();
});

const searchKeywords = ['Playwright by Testers Talk', 'Cypress By Testers Talk', 'API Testing by Testers Talk'];

for (const keyword of searchKeywords) {
    test(`Parameterized Test in Playwright: ${keyword}`, async () => {
        console.log("Test 2 Running");

        await test.step("Search with keyword", async () => {
            const searchBar = page.getByRole('combobox', { name: 'ค้นหา' });
            await searchBar.click();
            await searchBar.pressSequentially(keyword);
            await page.keyboard.press('Enter');
        });
        await test.step("Verify search results", async () => {
            await page.waitForTimeout(2000);
            await expect(page.getByRole('link', { name: new RegExp(keyword, 'i') }).first()).toBeVisible();
        });

    });
}


