import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:deleteOffer");

const requestShape = Joi.object({
  OfferID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    await Offer.update(
      { OfferDeletedAt: new Date() },
      {
        where: {
          OfferID: body.OfferID,
        },
      }
    );

    return { statusCode: 204 };
  },
  requestShape,
  $logger
);
