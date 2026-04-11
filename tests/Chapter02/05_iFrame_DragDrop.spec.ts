import { test, expect, Page } from '@playwright/test';

test('Handling iFrame and Drag & Drop in Playwright', async ({ page }) => {
    await page.goto('https://jqueryui.com/droppable/');
    const frame = page.frameLocator('.demo-frame');
    const dragElement = frame.locator('#draggable'); 
    const dropElement = frame.locator('#droppable');
    await dragElement.dragTo(dropElement);
    await expect(dropElement).toHaveText('Dropped!');

});