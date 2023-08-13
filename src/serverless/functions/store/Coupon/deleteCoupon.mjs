import Joi from "joi";
import { Coupon } from "../../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:Store:deleteCoupon");

const requestShape = Joi.object({
  CouponID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    await Coupon.update(
      { CouponDeletedAt: new Date() },
      {
        where: {
          CouponID: body.CouponID,
        },
      }
    );

    return { statusCode: 204 };
  },
  requestShape,
  $logger
);
