import Joi from "joi";
import { CartItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export const handler = lambdaProcessor(async (body) => {
  const cartItems = await CartItem.findAll({
    where: { CartItemDeletedAt: null },
    offset: (body.page - 1) * body.perPage,
    limit: body.perPage,
  });

  return { statusCode: 200, body: cartItems };
}, requestShape);
