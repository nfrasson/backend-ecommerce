import Joi from "joi";
import { randomUUID } from "node:crypto";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";
import { OrderItem } from "../../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  OrderItemPricePerItem: Joi.number().required(),
  OrderItemQuantity: Joi.number().integer().required(),
  OrderItemOrderID: Joi.string().guid({ version: "uuidv4" }).required(),
  OrderItemProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  const orderItem = await OrderItem.create({
    ...body,
    OrderItemID: randomUUID(),
  });

  return { statusCode: 201, body: orderItem };
}, requestShape);
