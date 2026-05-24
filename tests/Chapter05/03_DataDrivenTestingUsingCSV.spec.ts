import { test, expect, BrowserContext, Page } from "@playwright/test";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

type TestRecords = { username: string; password: string };
const records = parse(
    fs.readFileSync(path.join(__dirname, "../../test-data/qa/testdata.csv")),
    { columns: true, skipEmptyLines: true }
) as TestRecords[];

for (const record of records) {
    test(`Data Driven Testing login via - ${record.username}`, async ({ page }) => {
        await test.step("Navigate to the login page", async () => {
            await page.goto('https://practice.expandtesting.com/')
            await page.locator('a[href^="/login"]').first().click();
        })
        await test.step("Perform login", async () => {
            await page.locator('input[id="username"]').fill(record.username);
            await page.locator('input[id="password"]').fill(record.password);
            await page.locator('button[type="submit"]').click();
        })
        await test.step("Verify login success", async () => {
            await expect(page.locator('div[id="flash"]')).toHaveText('You logged into a secure area!');
        })
    });
}