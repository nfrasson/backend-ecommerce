import Joi from "joi";
import { OrderItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:deleteOrderItem");

const requestShape = Joi.object({
  OrderItemID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    await OrderItem.update(
      { OrderItemDeletedAt: new Date() },
      {
        where: {
          OrderItemID: body.OrderItemID,
        },
      }
    );

    return { statusCode: 204 };
  },
  requestShape,
  $logger
);
