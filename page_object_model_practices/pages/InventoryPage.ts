import { Page, Locator,expect } from '@playwright/test';
export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shoppingCartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.app_logo');
        this.shoppingCartIcon = page.locator('.shopping_cart_link');
    }
    async verifyOnInventoryPage() {
        await expect(this.pageTitle).toHaveText('Swag Labs');
    }
}