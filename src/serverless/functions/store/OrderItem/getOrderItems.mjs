import Joi from "joi";
import { OrderItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:getOrderItems");

const requestShape = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const orderItems = await OrderItem.findAll({
      where: { OrderItemDeletedAt: null },
      offset: (body.page - 1) * body.perPage,
      limit: body.perPage,
    });

    return { statusCode: 200, body: orderItems };
  },
  requestShape,
  $logger
);
