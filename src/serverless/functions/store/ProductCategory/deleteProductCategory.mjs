import Joi from "joi";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";
import { ProductCategory } from "../../../../commons/database/SQL/index.mjs";

const $logger = new Logger("ecommerce:Store:deleteProductCategory");

const requestShape = Joi.object({
  CategoryID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    await ProductCategory.update(
      { CategoryDeletedAt: new Date() },
      {
        where: {
          CategoryID: body.CategoryID,
        },
      }
    );

    return { statusCode: 204 };
  },
  requestShape,
  $logger
);
