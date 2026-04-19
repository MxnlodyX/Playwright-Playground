import { test, expect } from '@playwright/test';
// npx playwright test --last-failed

test('Test 1 : True and True' , async () => {
    expect(true).toBe(true);
});

test('Test 2 : True and False' , async () => {
    expect(true).toBe(false);
});

test('Test 3 : True and False' , async () => {
    expect(true).toBe(false);
});