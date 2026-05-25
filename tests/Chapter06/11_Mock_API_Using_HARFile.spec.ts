import {test, expect} from '@playwright/test';

test("Mock API using HAR file in playwright", async ({ page }) => {
    
    //Recording Har File
    await page.routeFromHAR('./har/fruits.har',{
        url: "*/**/api/v1/fruits",
        update: true    
    })

    // Go to URL
    await page.goto('https://demo.playwright.dev/api-mocking/')
    //Validate Text
    await expect(page.getByText("Strawberry")).toBeVisible();
})