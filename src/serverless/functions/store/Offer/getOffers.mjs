import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:getOffers");

const requestShape = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const offers = await Offer.findAll({
      where: { OfferDeletedAt: null },
      offset: (body.page - 1) * body.perPage,
      limit: body.perPage,
    });

    return { statusCode: 200, body: offers };
  },
  requestShape,
  $logger
);
