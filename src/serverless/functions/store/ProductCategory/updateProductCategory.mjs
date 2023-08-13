import Joi from "joi";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";
import { ProductCategory } from "../../../../commons/database/SQL/index.mjs";

const $logger = new Logger("ecommerce:Store:updateProductCategory");

const requestShape = Joi.object({
  CategoryName: Joi.string().required(),
  CategoryID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const productCategory = await ProductCategory.update(body, {
      where: {
        CategoryID: body.CategoryID,
      },
    });

    return { statusCode: 200, body: productCategory };
  },
  requestShape,
  $logger
);
