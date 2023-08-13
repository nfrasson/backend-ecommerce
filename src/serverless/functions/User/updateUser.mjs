import Joi from "joi";
import { User } from "../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:User:updateUser");

const requestShape = Joi.object({
  UserName: Joi.string().required(),
  UserPhone: Joi.string().required(),
  UserAddress: Joi.string().required(),
  UserEmail: Joi.string().email().required(),
  UserID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const user = await User.update(body, {
      where: {
        UserID: body.UserID,
      },
    });

    return { statusCode: 200, body: user };
  },
  requestShape,
  $logger
);
