import { test, expect } from '@playwright/test';

test("Mock API request in playwright", async ({ page }) => {
    //Mock API Request
    await page.route("*/**/api/v1/fruits", async route => {
        const json = [
            {name : 'playwright', id: 12},
            {name : 'playwright', id: 13},
            {name : 'cypress', id: 14},
            {name : 'api testing', id: 15},
        ]
        await route.fulfill({ json })
    })
    
    // Go to URL
    await page.goto("https://demo.playwright.dev/api-mocking/")

    //Validate Text
    await expect(page.getByText("playwright")).toBeVisible();
    await expect(page.getByText("cypress")).toBeVisible();
    await expect(page.getByText("api testing")).toBeVisible();
})