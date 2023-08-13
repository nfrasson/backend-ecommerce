import Joi from "joi";
import crypto from "node:crypto";
import { Cart } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:createCart");

const requestShape = Joi.object({
  CartUserID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemsID: Joi.array().items(Joi.string().guid({ version: "uuidv4" })),
});

export const handler = lambdaProcessor(
  async (body) => {
    const cart = await Cart.create({ ...body, CartID: crypto.randomUUID() });

    return { statusCode: 201, body: cart };
  },
  requestShape,
  $logger
);
