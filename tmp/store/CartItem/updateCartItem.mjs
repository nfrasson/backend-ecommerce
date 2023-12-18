import Joi from "joi";
import { CartItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:updateCartItem");

const requestShape = Joi.object({
  CartItemQuantity: Joi.number().integer().required(),
  CartItemID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemCartID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const cartItem = await CartItem.update(body, {
      where: {
        CartItemID: body.CartItemID,
      },
    });

    return { statusCode: 200, body: cartItem };
  },
  requestShape,
  $logger
);
