import Joi from "joi";
import { Coupon } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:updateCoupon");

const requestShape = Joi.object({
  CouponCode: Joi.string().required(),
  CouponValidUntil: Joi.date().required(),
  CouponDescription: Joi.string().required(),
  CouponDiscountValue: Joi.number().required(),
  CouponID: Joi.string().guid({ version: "uuidv4" }).required(),
  CouponDiscountType: Joi.string().valid("Percent", "Fixed").required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const coupon = await Coupon.update(body, {
      where: {
        CouponID: body.CouponID,
      },
    });

    return { statusCode: 200, body: coupon };
  },
  requestShape,
  $logger
);
