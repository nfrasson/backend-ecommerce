import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:updateOffer");

const requestShape = Joi.object({
  OfferValidUntil: Joi.date().required(),
  OfferDescription: Joi.string().required(),
  OfferCouponID: Joi.string().guid({ version: "uuidv4" }),
  OfferID: Joi.string().guid({ version: "uuidv4" }).required(),
  OfferProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const offer = await Offer.update(body, {
      where: {
        OfferID: body.OfferID,
      },
    });

    return { statusCode: 200, body: offer };
  },
  requestShape,
  $logger
);
