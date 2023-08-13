import Joi from "joi";
import crypto from "node:crypto";
import { lambdaProcessor } from "../../../../commons/utils/index.mjs";
import { Coupon } from "../../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  CouponCode: Joi.string().required(),
  CouponValidUntil: Joi.date().required(),
  CouponDescription: Joi.string().required(),
  CouponDiscountValue: Joi.number().required(),
  CouponDiscountType: Joi.string().valid("Percent", "Fixed").required(),
});

export const handler = lambdaProcessor(async (body) => {
  const coupon = await Coupon.create({
    ...body,
    CouponID: crypto.randomUUID(),
  });

  return { statusCode: 201, body: coupon };
}, requestShape);
