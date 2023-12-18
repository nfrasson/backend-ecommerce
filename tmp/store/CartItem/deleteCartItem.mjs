import Joi from "joi";
import { CartItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:deleteCartItem");

const requestShape = Joi.object({
  CartItemID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    await CartItem.update(
      { CartItemDeletedAt: new Date() },
      {
        where: {
          CartItemID: body.CartItemID,
        },
      }
    );

    return { statusCode: 204 };
  },
  requestShape,
  $logger
);
