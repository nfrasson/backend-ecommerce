import Joi from "joi";
import { Order } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  OrderDate: Joi.date().required(),
  OrderTotal: Joi.number().required(),
  OrderID: Joi.string().guid({ version: "uuidv4" }).required(),
  OrderUserID: Joi.string().guid({ version: "uuidv4" }).required(),
  OrderStatus: Joi.string().valid("Pending", "Shipped", "Delivered").required(),
});

export const handler = lambdaProcessor(async (body) => {
  const order = await Order.update(body, {
    where: {
      OrderID: body.OrderID,
    },
  });

  return { statusCode: 200, body: order };
}, requestShape);
