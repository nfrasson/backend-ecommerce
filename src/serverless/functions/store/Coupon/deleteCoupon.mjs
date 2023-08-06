import Joi from "joi";
import { Coupon } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  CouponID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  await Coupon.update(
    { CouponDeletedAt: new Date() },
    {
      where: {
        CouponID: body.CouponID,
      },
    }
  );

  return { statusCode: 204 };
}, requestShape);
