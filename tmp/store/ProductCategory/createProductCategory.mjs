import Joi from "joi";
import crypto from "node:crypto";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";
import { ProductCategory } from "../../../../commons/database/SQL/index.mjs";

const $logger = new Logger("ecommerce:Store:createProductCategory");

const requestShape = Joi.object({
  CategoryName: Joi.string().required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const productCategory = await ProductCategory.create({
      ...body,
      CategoryID: crypto.randomUUID(),
    });

    return { statusCode: 201, body: productCategory };
  },
  requestShape,
  $logger
);
