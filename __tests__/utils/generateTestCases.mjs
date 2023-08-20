function missingRequiredProperties(
  requiredProperties,
  mockRequestBody,
  successStatusCode = 200,
  failStatusCode = 500
) {
  return requiredProperties.map((key) => {
    const { [key]: ignoredValue, ...missingPropertyBody } = mockRequestBody;
    const shouldReturnValidationError = requiredProperties.includes(key);

    const expectedStatus = !shouldReturnValidationError;
    const expectedStatusCode = shouldReturnValidationError
      ? failStatusCode
      : successStatusCode;

    return [missingPropertyBody, expectedStatus, expectedStatusCode];
  });
}

export default { missingRequiredProperties };
