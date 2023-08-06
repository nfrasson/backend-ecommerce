import Joi from "joi";
import {
  generateUUID,
  lambdaProcessor,
} from "../../../../commons/utils/index.mjs";
import { CartItem } from "../../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  CartItemQuantity: Joi.number().integer().required(),
  CartItemCartID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  const cartItem = await CartItem.create({
    ...body,
    CartItemID: generateUUID(),
  });

  return { statusCode: 201, body: cartItem };
}, requestShape);
