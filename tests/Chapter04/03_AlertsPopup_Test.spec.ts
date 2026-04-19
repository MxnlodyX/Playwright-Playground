import { test, expect } from '@playwright/test';

test('Handling Alerts Popup ', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/')
    page.once('dialog', dialog =>{
        dialog.accept();
        console.log(`Alert Message is : ${dialog.message()}`);
        console.log(`Dialog Type is : ${dialog.type()}`);
    })
    await page.getByText('See an example alert', { exact: true }).click();
});

test('Handling Alerts Selection Popup [Accept Case]', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/')
    page.once('dialog', dialog =>{
        dialog.accept();
        console.log(`Alert Message is : ${dialog.message()}`);
        console.log(`Dialog Type is : ${dialog.type()}`);
    })
    await page.getByText('See a sample confirm', { exact: true }).click();
});

test('Handling Alerts Selection Popup [Dismiss Case]', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/')
    page.once('dialog', dialog =>{
        dialog.dismiss();
        console.log(`Alert Message is : ${dialog.message()}`);
        console.log(`Dialog Type is : ${dialog.type()}`);
    })
    await page.getByText('See a sample confirm', { exact: true }).click();
});
test('Handling Prompt Alert Popup ', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/')
    page.once('dialog', async(dialog) =>{
        console.log(`Alert Message is : ${dialog.message()}`);
        console.log(`Dialog Type is : ${dialog.type()}`);
        await dialog.accept('playwright');
    })
    await page.getByText('See a sample prompt', { exact: true }).click();
});