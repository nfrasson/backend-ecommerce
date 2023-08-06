import Joi from "joi";
import { Cart } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  CartID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartUserID: Joi.string().guid({ version: "uuidv4" }).required(),
  CartItemsID: Joi.array().items(Joi.string().guid({ version: "uuidv4" })),
});

export const handler = lambdaProcessor(async (body) => {
  const cart = await Cart.update(body, {
    where: {
      CartID: body.CartID,
    },
  });

  return { statusCode: 200, body: cart };
}, requestShape);
