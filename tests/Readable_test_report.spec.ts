import { test, expect } from '@playwright/test';

test('GitHub Sign In Test : Invalid Credentials ', async ({ page }) => {
  await test.step('Navigating to URL', async() =>{
      await page.goto('https://github.com/');
  });
  await test.step('Enter invalid credentials and click on Sign In button', async() =>{
      await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).click();
        await page.getByRole('textbox', { name: 'Username or email address' }).fill('TestDummyInut');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  });
  await test.step('Click on Sign In button', async() =>{
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  });
  await test.step('Verify error message is displayed', async() =>{
      await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  });
});