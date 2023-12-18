import Joi from "joi";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";
import { ProductCategory } from "../../../../commons/database/SQL/index.mjs";

const $logger = new Logger("ecommerce:Store:getProductCategories");

const requestShape = Joi.object({
  page: Joi.number().required(),
  perPage: Joi.number().required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const productCategories = await ProductCategory.findAll({
      where: { CategoryDeletedAt: null },
      offset: (body.page - 1) * body.perPage,
      limit: body.perPage,
    });

    return { statusCode: 200, body: productCategories };
  },
  requestShape,
  $logger
);
