import { test, expect, BrowserContext, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import path from 'path';
chromium.use(stealth());

let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
    console.log("Running before all test...");
})

test.beforeEach(async () => {
    const userDataDir = path.join(__dirname, 'google_user_data');
    context = await chromium.launchPersistentContext(userDataDir, {
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox'
        ]
    });
    page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async () => {
    console.log("Running after all test...");
});

test("Search Playwright Courses", async () => {
    await test.step("Search with keyword", async () => {
        await page.goto("https://google.com");
        const searchBar = page.getByRole('combobox', { name: 'ค้นหา' });
        await searchBar.click();
        await searchBar.pressSequentially('playwright by Testers Talk');
        await page.keyboard.press('Enter');
    });
    await test.step("Verify search results", async () => {
        await page.waitForTimeout(2000);
        await expect(page.getByRole('link', { name: /Playwright by Testers Talk/i }).first()).toBeVisible();
    });
    await test.step("Navigate to the course page", async () => {
        await page.getByRole('link', { name: /Playwright by Testers Talk/i }).first().click();
        await page.waitForTimeout(2000);
        await expect(page.getByRole('heading', { name: 'Playwright by Testers Talk' })).toBeVisible();
    });
});

test("เช็คหน้าแรกของ Google (ตัวอย่าง Test 2)", async () => {
    await page.goto("https://google.com");
    await expect(page).toHaveTitle(/Google/);
});

