import Joi from "joi";
import { Cart } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export const handler = lambdaProcessor(async (body) => {
  const carts = await Cart.findAll({
    where: { CartDeletedAt: null },
    offset: (body.page - 1) * body.perPage,
    limit: body.perPage,
  });

  return { statusCode: 200, body: carts };
}, requestShape);
