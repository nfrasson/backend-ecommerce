import Joi from "joi";
import { Offer } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestBody = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
});

export const handler = lambdaProcessor(async (body) => {
  const offers = await Offer.findAll({
    where: { deletedAt: null },
    offset: (body.page - 1) * body.limit,
    limit: body.limit,
  });

  return { statusCode: 200, body: offers };
}, requestBody);
