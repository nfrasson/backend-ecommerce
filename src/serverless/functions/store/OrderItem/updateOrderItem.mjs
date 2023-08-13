import Joi from "joi";
import { OrderItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:updateOrderItem");

const requestShape = Joi.object({
  OrderItemPricePerItem: Joi.number().required(),
  OrderItemQuantity: Joi.number().integer().required(),
  OrderItemID: Joi.string().guid({ version: "uuidv4" }).required(),
  OrderItemOrderID: Joi.string().guid({ version: "uuidv4" }).required(),
  OrderItemProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const orderItem = await OrderItem.update(body, {
      where: {
        OrderItemID: body.OrderItemID,
      },
    });

    return { statusCode: 200, body: orderItem };
  },
  requestShape,
  $logger
);
