import Joi from "joi";
import { Order } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:deleteOrder");

const requestShape = Joi.object({
  OrderID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    await Order.update(
      { OrderDeletedAt: new Date() },
      {
        where: {
          OrderID: body.OrderID,
        },
      }
    );

    return { statusCode: 204 };
  },
  requestShape,
  $logger
);
