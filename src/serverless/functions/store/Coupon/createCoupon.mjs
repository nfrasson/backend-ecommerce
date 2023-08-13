import Joi from "joi";
import crypto from "node:crypto";
import { Coupon } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:createCoupon");

const requestShape = Joi.object({
  CouponCode: Joi.string().required(),
  CouponValidUntil: Joi.date().required(),
  CouponDescription: Joi.string().required(),
  CouponDiscountValue: Joi.number().required(),
  CouponDiscountType: Joi.string().valid("Percent", "Fixed").required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const coupon = await Coupon.create({
      ...body,
      CouponID: crypto.randomUUID(),
    });

    return { statusCode: 201, body: coupon };
  },
  requestShape,
  $logger
);
