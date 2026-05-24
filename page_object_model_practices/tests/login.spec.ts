import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 
import { InventoryPage } from '../pages/InventoryPage';

test('User can login successfully using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Navigate to SauceDemo', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with standard user', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Verify login success', async () => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.verifyOnInventoryPage();
    });
});