import Joi from "joi";
import { Order } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:readOrder");

const requestShape = Joi.object({
  OrderID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const order = await Order.findOne({
      where: {
        OrderDeletedAt: null,
        OrderID: body.OrderID,
      },
    });

    return { statusCode: 200, body: order };
  },
  requestShape,
  $logger
);
