import { returnHandler, errorHandler, mergeBody } from "./index.mjs";

export function lambdaProcessor(processFunction, requestBodySchema) {
  return async (event) => {
    console.debug("EVENT", { event });
    try {
      const body = await requestBodySchema.validateAsync(mergeBody(event));
      const processResult = await processFunction(body);
      return returnHandler(processResult);
    } catch (error) {
      return errorHandler(error);
    }
  };
}
