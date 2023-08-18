export function assertResponse(
  result,
  expectedStatusCode,
  mockResponse = null
) {
  const parsedBody = JSON.parse(result.body);

  const expectedStatus = !!(
    expectedStatusCode >= 200 && expectedStatusCode < 300
  );

  // Use Jest's expect function to check that the status codes are equal
  expect(result.statusCode).toBe(expectedStatusCode);

  // Use Jest's expect function to check that the statuses are equal
  expect(parsedBody.status).toBe(expectedStatus);

  // If mockResponse is provided, use Jest's expect function to check that the data in the response is as expected
  if (mockResponse) {
    expect(parsedBody.data).toEqual(mockResponse);
  }
}
