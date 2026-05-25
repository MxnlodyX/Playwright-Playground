import { test, expect } from '@playwright/test';
import DynamicPostAPIRequestData from '../../test-data/api_requests/Dynamic_POST_API_Request.json';
import { formatAPIRequest } from '../../utils/APIHelpter';
import path from 'path';
import fs from 'fs';
import { faker } from '@faker-js/faker';
test.use({
    baseURL: process.env.BASE_API_URL
})

test('Dynamic POST API Request Test using Static file in playwright & typescript', async ({ request }) => {
    const filePath = path.join(__dirname, '../../test-data/api_requests/Dynamic_POST_API_Request.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

    // Your dynamic values array mapped to {0}, {1}, and {2}
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 1000 });
    const values = [firstName, lastName, totalPrice];

    // 1. Format the string using your util
    const postAPIRequestString = await formatAPIRequest(jsonTemplate, values);

    // 2. Parse it into a JavaScript object for easy assertions later
    const expectedPayload = JSON.parse(postAPIRequestString);

    // 3. Send the request
    const postAPIResponse = await request.post('/booking', {
        data: expectedPayload // Playwright handles the object cleanly
    });

    const jsonPostAPIResponse = await postAPIResponse.json();
    console.log(`POST API Response: ${JSON.stringify(jsonPostAPIResponse, null, 2)}`);

    // Standard Status Assertions
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // 4. Assert response matches the payload we builts
    // Assert using a partial object match
    expect(jsonPostAPIResponse.booking).toMatchObject({
        firstname: firstName, // "John"
        lastname: lastName,  // "Doe"
        totalprice: totalPrice, // 1500
        depositpaid: expectedPayload.depositpaid,
        bookingdates: {
            checkin: expectedPayload.bookingdates.checkin,
            checkout: expectedPayload.bookingdates.checkout
        }
    });
});