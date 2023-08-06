import Joi from "joi";
import { Cart } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  CartID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  const cart = await Cart.findOne({
    where: {
      CartDeletedAt: null,
      CartID: body.CartID,
    },
  });

  return { statusCode: 200, body: cart };
}, requestShape);
