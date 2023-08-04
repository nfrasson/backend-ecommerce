export function mergeBody({
  body = {},
  pathParameters = {},
  queryStringParameters = {},
}) {
  return Object.assign(
    {},
    pathParameters,
    queryStringParameters,
    typeof body === "string" ? JSON.parse(body) : body
  );
}
