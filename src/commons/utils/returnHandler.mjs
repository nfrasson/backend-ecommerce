export function returnHandler({ statusCode, body }) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    ...(body && {
      body: JSON.stringify(
        {
          data: body,
        },
        null,
        2
      ),
    }),
  };
}
