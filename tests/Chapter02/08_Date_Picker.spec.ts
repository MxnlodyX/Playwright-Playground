import { test, expect } from "@playwright/test";

test('Selecting date value in playwright', async ({ page }) => {
    await page.goto('https://jqueryui.com/datepicker/');

    //Hard coded date value
    const frame = page.frameLocator('.demo-frame');
    // await frame.locator('#datepicker').fill('01/01/2024');

    //Select dynamic date
    // await frame.locator('#datepicker').click();
    // await frame.locator('.ui-state-highlight').click();

    //Select past date
    // await frame.locator('#datepicker').click();
    // await frame.locator('.ui-icon-circle-triangle-w').click();
    // await frame.locator('text="15"').click();

    //Select future date
    await frame.locator('#datepicker').click();
    await frame.locator('.ui-icon-circle-triangle-e').click();
    await frame.locator('text="12"').click();



});