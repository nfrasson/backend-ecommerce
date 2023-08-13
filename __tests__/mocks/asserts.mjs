import assert from "node:assert";

export function assertResponse(
  result,
  expectedStatusCode,
  mockResponse = null
) {
  const parsedBody = JSON.parse(result.body);

  const expectedStatus = !!(
    expectedStatusCode >= 200 && expectedStatusCode < 300
  );

  assert.strictEqual(
    result.statusCode,
    expectedStatusCode,
    "Unexpected status code"
  );
  assert.strictEqual(parsedBody.status, expectedStatus, "Unexpected status");
  if (mockResponse) {
    assert.deepStrictEqual(
      parsedBody.data,
      mockResponse,
      "Unexpected response data"
    );
  }
}
