import { test, expect, Page, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import { time } from 'console';
chromium.use(stealth());
let page: Page;
let context: BrowserContext;
test.beforeEach(async () => {
    const userDataDir = path.join(__dirname, 'google_user_data');
    context = await chromium.launchPersistentContext(userDataDir, {
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox'
        ]
    });
    page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
    await page.goto('https://www.google.com/');

});
test('Keyboard actions in Playwright', async ({ }) => {
    await page.goto('https://www.google.com/');

    // Enter action from keyboard
    // await page.getByLabel('ค้นหา', { exact: true }).click();
    // await page.getByLabel('ค้นหา', { exact: true }).fill('playwright by Testers Talk');
    // await page.getByLabel('ค้นหา', { exact: true }).press('Enter');

    // await page.waitForTimeout(2000); 

    // Selecting & deleting from keyboard
    // await page.getByRole('combobox', { name: 'ค้นหา' }).click();
    // await page.keyboard.press('Control+KeyA');
    // await page.keyboard.press('Delete');

    // Press TAB and Enter
    await page.getByLabel('ค้นหา', { exact: true }).click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
});