import Joi from "joi";
import { Cart } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:getCarts");

const requestShape = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const carts = await Cart.findAll({
      where: { CartDeletedAt: null },
      offset: (body.page - 1) * body.perPage,
      limit: body.perPage,
    });

    return { statusCode: 200, body: carts };
  },
  requestShape,
  $logger
);
