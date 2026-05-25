import { test, expect } from '@playwright/test';
import { getPOSTAPIRequestBody } from '../../utils/APIHelpter'; // Fixed typo if it's named 'APIHelper' in your codebase
import { faker } from '@faker-js/faker';
import AuthenUser from '../../test-data/api_requests/Authen.json';
import patchAPIRequest from '../../test-data/api_requests/PATCH_API_Request.json';
test.use({
    baseURL: process.env.BASE_API_URL
});

test('Create PATCH API Request using Playwright and TypeScript', async ({ request }) => {

    // 1. Generate dynamic test data using Faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 1000 });

    // 2. Build the request object directly using your helper utility
    const postAPIRequest = await getPOSTAPIRequestBody(
        firstName,
        lastName,
        totalPrice,
        true,
        "Breakfast",
        "2024-01-01",
        "2024-01-07"
    );

    // 3. Send the POST request
    const postAPIResponse = await request.post('/booking', {
        data: postAPIRequest
    });

    const jsonPostAPIResponse = await postAPIResponse.json();
    console.log(`POST API Response: ${JSON.stringify(jsonPostAPIResponse, null, 2)}`);

    // POST HTTP Assertions
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    // 4. Assert POST response payload matches what we constructed
    expect(jsonPostAPIResponse.booking).toMatchObject({
        firstname: firstName,
        lastname: lastName,
        totalprice: totalPrice,
    });

    // 5. execute the GET Request to verify persistence using Query Parameters

    const getAPIResponse = await request.get(`/booking`, {
        params: {
            firstname: firstName,
            lastname: lastName
        }
    });
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');

    const jsonGetAPIResponse = await getAPIResponse.json();
    console.log(`GET API Response: ${JSON.stringify(jsonGetAPIResponse, null, 2)}`);

    // 1. Extract the ID safely from the first item in the array
    const bookingID = jsonGetAPIResponse[0].bookingid;
    console.log(`Booking ID for GET Request: ${bookingID}`);

    expect(jsonGetAPIResponse[0]).toMatchObject({
        bookingid: bookingID
    });

    // Generate TOken
    const tokenAPIResponse = await request.post(`/auth`, {
        data: AuthenUser
    })

    expect(tokenAPIResponse.status()).toBe(200);
    expect(tokenAPIResponse.statusText()).toBe('OK');

    const tokenAPIJsonResponse = await tokenAPIResponse.json()
    const token = tokenAPIJsonResponse.token;
    console.log(`Token Generated: ${token}`);

    const patchAPIResponse = await request.patch(`/booking/${bookingID}`,{
        headers : {
            'Content-Type' : 'application/json',
            'Cookie' : `token=${token}`
        },
        data : patchAPIRequest
    })
    expect(patchAPIResponse.status()).toBe(200);
    expect(patchAPIResponse.statusText()).toBe('OK');
    const jsonPatchAPIResponse = await patchAPIResponse.json();
    console.log(`PATCH API Response: ${JSON.stringify(jsonPatchAPIResponse, null, 2)}`);

});