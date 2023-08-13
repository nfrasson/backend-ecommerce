import Joi from "joi";
import crypto from "node:crypto";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";
import { Cart } from "../../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  CartUserID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemsID: Joi.array().items(Joi.string().guid({ version: "uuidv4" })),
});

export const handler = lambdaProcessor(async (body) => {
  const cart = await Cart.create({ ...body, CartID: crypto.randomUUID() });

  return { statusCode: 201, body: cart };
}, requestShape);
