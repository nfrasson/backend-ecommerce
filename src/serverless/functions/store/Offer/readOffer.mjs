import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:readOffer");

const requestShape = Joi.object({
  OfferID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const offer = await Offer.findOne({
      where: {
        OfferDeletedAt: null,
        OfferID: body.OfferID,
      },
    });

    return { statusCode: 200, body: offer };
  },
  requestShape,
  $logger
);
