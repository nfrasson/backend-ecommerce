import Joi from "joi";
import crypto from "node:crypto";
import { Order } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:createOrder");

const requestShape = Joi.object({
  OrderDate: Joi.date().required(),
  OrderTotal: Joi.number().required(),
  OrderUserID: Joi.string().guid({ version: "uuidv4" }).required(),
  OrderStatus: Joi.string().valid("Pending", "Shipped", "Delivered").required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const order = await Order.create({ ...body, OrderID: crypto.randomUUID() });

    return { statusCode: 201, body: order };
  },
  requestShape,
  $logger
);
