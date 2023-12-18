export function errorHandler(error) {
  console.error(error);
  return {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      status: false,
      error,
    }),
  };
}
