import Joi from "joi";
import crypto from "node:crypto";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";
import { Offer } from "../../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  OfferValidUntil: Joi.date().required(),
  OfferDescription: Joi.string().required(),
  OfferCouponID: Joi.string().guid({ version: "uuidv4" }),
  OfferProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  const offer = await Offer.create({ ...body, OfferID: crypto.randomUUID() });

  return { statusCode: 201, body: offer };
}, requestShape);
