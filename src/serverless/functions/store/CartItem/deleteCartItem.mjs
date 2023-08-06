import Joi from "joi";
import { CartItem } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  CartItemID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  await CartItem.update(
    { CartItemDeletedAt: new Date() },
    {
      where: {
        CartItemID: body.CartItemID,
      },
    }
  );

  return { statusCode: 204 };
}, requestShape);
