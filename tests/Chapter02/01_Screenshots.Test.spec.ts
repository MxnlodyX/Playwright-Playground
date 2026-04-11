import { test, expect } from '@playwright/test';
import path from 'path';
const pathScreenshot = path.join(__dirname, 'screenshot');
test("Capture screenshots in playwright", async ({page}) => {

    await page.goto('https://www.youtube.com/@testerstalk');
    // Element Locator Screenshot
    await page.locator('#page-header-container').screenshot({path: pathScreenshot + '/header.png'});
    // Page Screenshot
    await page.screenshot({path: pathScreenshot + '/page.png'});
    // Full Page Screenshot
    await page.screenshot({path: pathScreenshot + '/fullpage.png', fullPage: true});

    await page.close();

});