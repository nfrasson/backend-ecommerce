import Joi from "joi";
import { Product } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:updateProduct");

const requestShape = Joi.object({
  ProductName: Joi.string().required(),
  ProductPrice: Joi.number().required(),
  ProductImageURL: Joi.string().required(),
  ProductDescription: Joi.string().required(),
  ProductStockQuantity: Joi.number().integer().required(),
  ProductID: Joi.string().guid({ version: "uuidv4" }).required(),
  ProductCategoryID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const product = await Product.update(body, {
      where: {
        ProductID: body.ProductID,
      },
    });

    return { statusCode: 200, body: product };
  },
  requestShape,
  $logger
);
