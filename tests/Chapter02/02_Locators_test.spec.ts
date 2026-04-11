import { test, expect } from '@playwright/test';
test('Locators in Playwright', async ({ page }) => {
    //await page.goto('https://github.com/MxnlodyX');
    // get By Role
    // await page.getByRole('link',{name : 'Sign in'}).click();

    // get By Label (F12 Tag : <label for="XXXXXXXX">XXXXXXXX</label> , aria-label="XXXXXXXX")
    // await page.getByLabel('Homepage',{exact: true}).first().click();

    // get by Alt Attribute - For Images
    // await page.getByAltText('MxnlodyX').click();

    // get by TestID (F12 Tag : data-tab-item="XXXXXXXX")
    // await page.getByTestId("repositories").first().click();

    // get by text
    // await page.getByText('Sign up').first().click();

    // get by placeholder , CSS Selector , XPATH Selector
    // await page.goto("https://www.youtube.com/@testerstalk");
    // await page.getByPlaceholder('Search').first().click();
    // await page.locator('.yt-searchbox-input').first().fill('Playwright Tutorial');
    // await page.locator('//*[@id="center"]/yt-searchbox/div[1]/button').first().click();

    // get by title (F12 Tag : title="XXXXXXXX")
    // await page.goto("https://www.google.com/");
    // await page.getByTitle('ค้นหา').first().fill("playwright by testers talk");


}); 