import { APIGatewayProxyEvent } from "aws-lambda";

export function concatenateData(event: APIGatewayProxyEvent): object {
  const { body = {}, pathParameters = {}, queryStringParameters = {} } = event;

  return {
    ...pathParameters,
    ...queryStringParameters,
    ...(typeof body === "string" ? JSON.parse(body) : body),
  };
}
