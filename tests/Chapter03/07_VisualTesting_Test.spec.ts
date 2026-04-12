// Expect Result by Image Comparison in Playwright
import { test, expect, BrowserContext, Page } from '@playwright/test';

test('Element Visual Comparison in Playwright', async ({ page }) => {
    await page.goto('https://github.com/login');
    await expect(page).toHaveScreenshot('GitHubLoginPage.png')



    const element = page.locator('[data-test-selector="login-standard-view"]');
    await expect(element).toHaveScreenshot('GitHubLoginForm.png');

    await page.locator('#login_field').fill('testuser');
    await expect(page).toHaveScreenshot('GitHubLoginForm.png')



});