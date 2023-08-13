import Joi from "joi";
import crypto from "node:crypto";
import { Product } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:createProduct");

const requestShape = Joi.object({
  ProductName: Joi.string().required(),
  ProductPrice: Joi.number().required(),
  ProductImageURL: Joi.string().required(),
  ProductDescription: Joi.string().required(),
  ProductStockQuantity: Joi.number().integer().required(),
  ProductCategoryID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const product = await Product.create({
      ...body,
      ProductID: crypto.randomUUID(),
    });

    return { statusCode: 201, body: product };
  },
  requestShape,
  $logger
);
