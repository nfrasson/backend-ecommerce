import Joi from "joi";
import { Product } from "../../../../commons/database/SQL/index.mjs";
import {
  generateUUID,
  lambdaProcessor,
} from "../../../../commons/utils/index.mjs";

const requestBody = Joi.object({
  ProductID: Joi.string().guid({ version: "uuidv4" }).required(),
  ProductName: Joi.string().required(),
  ProductCategoryID: Joi.string().guid({ version: "uuidv4" }).required(),
  ProductDeletedAt: Joi.date().allow(null),
});

export const handler = lambdaProcessor(async (body) => {
  const product = await Product.create({ ...body, ProductID: generateUUID() });

  return { statusCode: 201, body: product };
}, requestBody);
