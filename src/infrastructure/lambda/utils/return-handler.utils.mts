import { APIGatewayProxyResult } from "aws-lambda";

export function returnHandler(data: {
  statusCode?: number;
  body?: object;
}): APIGatewayProxyResult {
  return {
    statusCode: data.statusCode ?? 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(data.body ?? {}),
  };
}
