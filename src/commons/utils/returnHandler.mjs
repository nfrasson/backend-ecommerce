export function returnHandler({ statusCode, body }) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },

    body: JSON.stringify(
      {
        status: true,
        data: body || {},
      },
      null,
      2
    ),
  };
}
