import Joi from "joi";
import { Cart } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  CartID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  await Cart.update(
    { CartDeletedAt: new Date() },
    {
      where: {
        CartID: body.CartID,
      },
    }
  );

  return { statusCode: 204 };
}, requestShape);
