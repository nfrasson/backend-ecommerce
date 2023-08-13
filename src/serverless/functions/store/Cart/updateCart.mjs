import Joi from "joi";
import { Cart } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:updateCart");

const requestShape = Joi.object({
  CartID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartUserID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemsID: Joi.array().items(Joi.string().guid({ version: "uuidv4" })),
});

export const handler = lambdaProcessor(
  async (body) => {
    const cart = await Cart.update(body, {
      where: {
        CartID: body.CartID,
      },
    });

    return { statusCode: 200, body: cart };
  },
  requestShape,
  $logger
);
