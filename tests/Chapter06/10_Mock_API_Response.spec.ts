import { test, expect } from '@playwright/test';

test("Mock API response in playwright", async ({ page }) => {
    //Mock API Response
    await page.route("*/**/api/v1/fruits", async route => {
        const response = await route.fetch()
        const json = await response.json()
        json.push({ name: 'playwright', id: 12 })
        json.push({ name: 'playwright', id: 13 })
        json.push({ name: 'cypress', id: 14 })
        json.push({ name: 'api testing', id: 15 })

        await route.fulfill({ response, json })
    })

    // Go to URL
    await page.goto("https://demo.playwright.dev/api-mocking/")

    //Validate Text
    await expect(page.getByText("playwright")).toBeVisible();
    await expect(page.getByText("cypress")).toBeVisible();
    await expect(page.getByText("api testing")).toBeVisible();
})