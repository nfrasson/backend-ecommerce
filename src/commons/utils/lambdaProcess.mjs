import { returnHandler, mergeBody } from "./index.mjs";

export function lambdaProcessor(processFunction, requestShape) {
  return async (event) => {
    console.debug("EVENT", { event });
    try {
      const body = await requestShape.validateAsync(mergeBody(event));

      const processResult = await processFunction(body);
      console.debug("PROCESS_RESULT", { processResult });

      return returnHandler(processResult);
    } catch (error) {
      console.error("EXECUTION_FAILED", error);
      return returnHandler({
        statusCode: 500,
        body: error.message,
        status: false,
      }); // To-do mock default error status code and messages
    }
  };
}
