export function returnHandler({ statusCode, body, status }) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(
      {
        status,
        data: body ?? {},
      },
      null,
      2
    ),
  };
}
