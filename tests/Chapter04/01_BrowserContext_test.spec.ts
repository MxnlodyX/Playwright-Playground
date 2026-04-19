import { test, expect } from '@playwright/test';

test('GitHub Sign In Test : Invalid Credentials ', async ({ page, browser }) => {
    await page.goto('https://github.com/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Username or email address' }).click();
    await page.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');

    //New browser session with new context and page
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto('https://github.com/');
    await page2.getByRole('link', { name: 'Sign in' }).click();
    await page2.getByRole('textbox', { name: 'Username or email address' }).click();
    await page2.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
    await page2.getByRole('textbox', { name: 'Password' }).click();
    await page2.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page2.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page2.getByRole('alert')).toContainText('Incorrect username or password.');

    //create new tabs
    const newTab1 = await context2.newPage();
    await newTab1.goto('https://github.com/');
    await newTab1.getByRole('link', { name: 'Sign in' }).click();
    await newTab1.getByRole('textbox', { name: 'Username or email address' }).click();
    await newTab1.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
    await newTab1.getByRole('textbox', { name: 'Password' }).click();
    await newTab1.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await newTab1.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(newTab1.getByRole('alert')).toContainText('Incorrect username or password.');
    

});