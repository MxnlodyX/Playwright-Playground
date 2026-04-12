import { test, expect, BrowserContext, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import path from 'path';
chromium.use(stealth());

let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
    const userDataDir = path.join(__dirname, 'google_user_data');
    context = await chromium.launchPersistentContext(userDataDir, {
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox'
        ]
    });
    page = context.pages()[0];
});
test.afterAll(async () => {
    await context.close();
});

// run test using tag npx playwright test -- grep '(TagName)''
test("Search Playwright Courses 1",{tag : ['@SmokeTesting']}, async () => {
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

test("Search Playwright Courses 2 ", {tag : ['@SmokeTesting','@RegressionTesting']}, async () => {
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

test("Search Playwright Courses 3", {tag : ['@RegressionTesting']}, async () => {
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