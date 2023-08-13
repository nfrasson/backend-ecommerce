import { returnHandler, mergeBody } from "./index.mjs";

export function lambdaProcessor(processFunction, requestShape, $logger) {
  return async (event) => {
    try {
      $logger.debug("EVENT", { event });

      const body = await requestShape.validateAsync(mergeBody(event));
      $logger.info("VALITED_BODY", { body });

      const processResult = await processFunction(body);
      $logger.info("PROCESS_RESULT", { processResult });

      return returnHandler({ ...processResult, status: true });
    } catch (error) {
      $logger.error("EXECUTION_FAILED", error);
      return returnHandler({
        status: false,
        statusCode: 500,
        body: error.message,
      }); // To-do mock default error status code and messages
    }
  };
}
