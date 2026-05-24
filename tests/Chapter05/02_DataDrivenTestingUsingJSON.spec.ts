import { test, expect } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import testData from '../../test-data/qa/testdata.json';
import path from 'path';
chromium.use(stealth());
type TestData = {
    TestDataSet1: {
        Skill1: string,
        Skill2: string
    },
    TestDataSet2: {
        Skill1: string,
        Skill2: string
    }
}
const typedTestData = testData as TestData
for (const dataSetName in typedTestData) {
    const skill = typedTestData[dataSetName as keyof TestData];
    test(`Data Driven Testing Using Json file in Playwright - ${dataSetName}`, async () => {
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
            await searchBar.pressSequentially(skill.Skill1);
            await page.keyboard.press('Enter');
        });
        await test.step("Navigate to the course page", async () => {
            await page.getByRole('link', { name: skill.Skill1 }).first().click();
            await page.waitForTimeout(2000);
            await expect(
                page
                    .locator('yt-page-header-view-model:visible')
                    .filter({ hasText: skill.Skill1 })
                    .first()
            ).toBeVisible();
        });
        await context.close();
    });
}
