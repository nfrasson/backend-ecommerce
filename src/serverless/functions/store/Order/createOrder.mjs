import Joi from "joi";
import { randomUUID } from "node:crypto";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";
import { Order } from "../../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  OrderDate: Joi.date().required(),
  OrderTotal: Joi.number().required(),
  OrderUserID: Joi.string().guid({ version: "uuidv4" }).required(),
  OrderStatus: Joi.string().valid("Pending", "Shipped", "Delivered").required(),
});

export const handler = lambdaProcessor(async (body) => {
  const order = await Order.create({ ...body, OrderID: randomUUID() });

  return { statusCode: 201, body: order };
}, requestShape);
