import { test, expect, Page, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import path from 'path';
chromium.use(stealth());
let context: BrowserContext;
let page: Page;

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
test('Mouse Actions in Playwright', async () => {
    // const searchBar = page.getByRole('combobox', { name: 'ค้นหา' });
    // await searchBar.click();
    // await searchBar.pressSequentially('playwright by Testers Talk');
    // await page.keyboard.press('Enter');

    // Left button click
    //await page.getByRole('link', { name: '#1 Playwright Tutorial Full Course 2026 | Playwright Testing ...' }).first().click({ button: 'left' });

    // Middle button click
    //await page.getByRole('link', { name: '#1 Playwright Tutorial Full Course 2026 | Playwright Testing ...' }).first().click({ button: 'middle' });

    // Right button click
    //await page.getByRole('link', { name: /Playwright by Testers Talk/i }).first().click({ button: 'right' });
    await page.getByLabel('ค้นหาด้วยเสียง').hover();
    await page.getByLabel('ค้นหาด้วยเสียง').click({ button: 'left' });

});