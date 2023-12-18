import Joi from "joi";
import crypto from "node:crypto";
import { CartItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:createCartItem");

const requestShape = Joi.object({
  CartItemQuantity: Joi.number().integer().required(),
  CartItemCartID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const cartItem = await CartItem.create({
      ...body,
      CartItemID: crypto.randomUUID(),
    });

    return { statusCode: 201, body: cartItem };
  },
  requestShape,
  $logger
);
