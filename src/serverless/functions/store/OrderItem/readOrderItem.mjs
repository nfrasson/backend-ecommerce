import Joi from "joi";
import { OrderItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:readOrderItem");

const requestShape = Joi.object({
  OrderItemID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const orderItem = await OrderItem.findOne({
      where: {
        OrderItemDeletedAt: null,
        OrderItemID: body.OrderItemID,
      },
    });

    return { statusCode: 200, body: orderItem };
  },
  requestShape,
  $logger
);
