import Joi from "joi";
import { Product } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:readProduct");

const requestShape = Joi.object({
  ProductID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const product = await Product.findOne({
      where: {
        ProductDeletedAt: null,
        ProductID: body.ProductID,
      },
    });

    return { statusCode: 200, body: product };
  },
  requestShape,
  $logger
);
