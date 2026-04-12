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
    await page.goto("https://google.com");

});

test("Test 1", async () => {
    console.log("Test 1 Running");
    await test.step("Search with keyword", async () => {
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

//skip test to demonstrate the use of test.skip annotation
test.skip("Test 2", async () => {
    console.log("Test 2 Running");

    await test.step("Search with keyword", async () => {
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

//skip test to demonstrate the use of test.skip annotation
test.only("Test 3", async () => {
    console.log("Test 3 Running");
    await test.step("Search with keyword", async () => {
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