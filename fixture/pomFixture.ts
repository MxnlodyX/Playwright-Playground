import { test as base } from '@playwright/test';
import { LoginPage } from '../page_object_model_practices/pages/LoginPage';
import { InventoryPage } from '../page_object_model_practices/pages/InventoryPage';

type MyFixtures = {
    loginPage : LoginPage;
    inventoryPage : InventoryPage;
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    }
});
export { expect } from '@playwright/test';