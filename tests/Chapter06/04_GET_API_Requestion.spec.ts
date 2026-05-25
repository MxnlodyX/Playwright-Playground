import { test, expect } from '@playwright/test';
import { getPOSTAPIRequestBody } from '../../utils/APIHelpter'; // Fixed typo if it's named 'APIHelper' in your codebase
import { faker } from '@faker-js/faker';

test.use({
    baseURL: process.env.BASE_API_URL
});

test('Create Booking and Verify with GET Request', async ({ request }) => {
    
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
        depositpaid: postAPIRequest.depositpaid,
        bookingdates: {
            checkin: postAPIRequest.bookingdates.checkin,
            checkout: postAPIRequest.bookingdates.checkout
        }
    });

    // 5. Extract ID and execute the GET Request to verify persistence
    const bookingId = jsonPostAPIResponse.bookingid;
    console.log(`Booking ID for GET Request: ${bookingId}`);
    
    const getAPIResponse = await request.get(`/booking/${bookingId}`);
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');

    const jsonGetAPIResponse = await getAPIResponse.json();
    console.log(`GET API Response: ${JSON.stringify(jsonGetAPIResponse, null, 2)}`);
    
    // 6. Assert GET response data matches our expectations
    expect(jsonGetAPIResponse).toMatchObject({
        firstname: firstName, 
        lastname: lastName,  
        totalprice: totalPrice, 
        depositpaid: postAPIRequest.depositpaid,
        bookingdates: {
            checkin: postAPIRequest.bookingdates.checkin,
            checkout: postAPIRequest.bookingdates.checkout
        }
    });
});