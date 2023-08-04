import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import {
  lambdaProcessor,
} from "../../../../commons/utils/index.mjs";

const requestBody = Joi.object({
  OfferID: Joi.string()
    .guid({
      version: "uuidv4",
    })
    .required(),
  ProductID: Joi.string()
    .guid({
      version: "uuidv4",
    })
    .required(),
  OfferDescription: Joi.string().required(),
});

export const handler = lambdaProcessor(async (body) => {
  const offer = await Offer.update(body, {
    where: {
      OfferID: body.OfferID,
    },
  });

  return { statusCode: 200, body: offer };
}, requestBody);
  