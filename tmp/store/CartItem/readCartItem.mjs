import Joi from "joi";
import { CartItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:readCartItem");

const requestShape = Joi.object({
  CartItemID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const cartItem = await CartItem.findOne({
      where: {
        CartItemDeletedAt: null,
        CartItemID: body.CartItemID,
      },
    });

    return { statusCode: 200, body: cartItem };
  },
  requestShape,
  $logger
);
