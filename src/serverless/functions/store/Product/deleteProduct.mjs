import Joi from "joi";
import { Product } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:deleteProduct");

const requestShape = Joi.object({
  ProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    await Product.update(
      { ProductDeletedAt: new Date() },
      {
        where: {
          ProductID: body.ProductID,
        },
      }
    );

    return { statusCode: 204 };
  },
  requestShape,
  $logger
);
