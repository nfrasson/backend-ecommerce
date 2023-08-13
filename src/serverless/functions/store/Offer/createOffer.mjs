import Joi from "joi";
import crypto from "node:crypto";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:createOffer");

const requestShape = Joi.object({
  OfferValidUntil: Joi.date().required(),
  OfferDescription: Joi.string().required(),
  OfferCouponID: Joi.string().guid({ version: "uuidv4" }),
  OfferProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const offer = await Offer.create({ ...body, OfferID: crypto.randomUUID() });

    return { statusCode: 201, body: offer };
  },
  requestShape,
  $logger
);
