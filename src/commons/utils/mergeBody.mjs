export function mergeBody(event) {
  const { body = {}, pathParameters = {}, queryStringParameters = {} } = event;

  return {
    ...pathParameters,
    ...queryStringParameters,
    ...(typeof body === "string" ? JSON.parse(body) : body),
  };
}
