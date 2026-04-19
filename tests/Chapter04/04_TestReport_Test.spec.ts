import { test, expect } from '@playwright/test';

test.describe("Smoke Test", () => {
    test("Test 1", async ({ page }) => {
        await page.goto('https://github.com/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();
        await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
    });
});

test.describe("Regression Test", () => {
    test("Test 2", async ({ page }) => {
        await page.goto('https://github.com/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();
        await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
    });
    test("Test 3", async ({ page }) => {
        await page.goto('https://github.com/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();
        await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
    });
    test("Test 4", async ({ page }) => {
        await page.goto('https://github.com/');
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();
        await expect(page.getByRole('alert')).toContainText('Wrong Wrong Wrong.');
    });
});