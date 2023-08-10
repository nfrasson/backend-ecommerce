import Joi from "joi";
import { randomUUID } from "node:crypto";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";
import { ProductCategory } from "../../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  CategoryName: Joi.string().required(),
});

export const handler = lambdaProcessor(async (body) => {
  const productCategory = await ProductCategory.create({
    ...body,
    CategoryID: randomUUID(),
  });

  return { statusCode: 201, body: productCategory };
}, requestShape);
