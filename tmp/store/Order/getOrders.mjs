import Joi from "joi";
import { Order } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:getOrders");

const requestShape = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const orders = await Order.findAll({
      where: { OrderDeletedAt: null },
      offset: (body.page - 1) * body.perPage,
      limit: body.perPage,
    });

    return { statusCode: 200, body: orders };
  },
  requestShape,
  $logger
);
