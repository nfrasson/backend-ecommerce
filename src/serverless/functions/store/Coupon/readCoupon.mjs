import Joi from "joi";
import { Coupon } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";

const requestShape = Joi.object({
  CouponID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(async (body) => {
  const coupon = await Coupon.findOne({
    where: {
      CouponDeletedAt: null,
      CouponID: body.CouponID,
    },
  });

  return { statusCode: 200, body: coupon };
}, requestShape);
