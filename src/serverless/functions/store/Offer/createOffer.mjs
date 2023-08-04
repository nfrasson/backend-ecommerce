import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import {
  generateUUID,
  lambdaProcessor,
} from "../../../../commons/utils/index.mjs";

const requestBody = Joi.object({
  ProductID: Joi.string()
    .guid({
      version: "uuidv4",
    })
    .required(),
  OfferDescription: Joi.string().required(),
});

export const handler = lambdaProcessor(async (body) => {
  const offer = await Offer.create({ ...body, OfferID: generateUUID() });

  return { statusCode: 201, body: offer };
}, requestBody);
