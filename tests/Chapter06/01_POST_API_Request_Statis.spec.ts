import { test, expect } from '@playwright/test';
import postAPIRequestData from '../../test-data/api_requests/POST_API_Request.json';

test.use({
    baseURL: process.env.BASE_API_URL
})

test('POST API Request Test using Static file in playwright & typescript', async ({ request }) => {
    const postAPIResponse = await request.post('/booking', {
        data : postAPIRequestData
    });
    const jsonPostAPIResponse = await postAPIResponse.json()
    console.log(`POST API Response: ${JSON.stringify(jsonPostAPIResponse,null,2)}`);

    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe('OK');
    expect(postAPIResponse.headers()['content-type']).toContain('application/json');

    
    expect(jsonPostAPIResponse.booking.firstname).toBe(postAPIRequestData.firstname);
    expect(jsonPostAPIResponse.booking.lastname).toBe(postAPIRequestData.lastname);
    expect(jsonPostAPIResponse.booking.totalprice).toBe(postAPIRequestData.totalprice);
    expect(jsonPostAPIResponse.booking.depositpaid).toBe(postAPIRequestData.depositpaid);
    expect(jsonPostAPIResponse.booking.bookingdates.checkin).toBe(postAPIRequestData.bookingdates.checkin);
    expect(jsonPostAPIResponse.booking.bookingdates.checkout).toBe(postAPIRequestData.bookingdates.checkout);
    expect(jsonPostAPIResponse.booking.additionalneeds).toBe(postAPIRequestData.additionalneeds);
});