import Joi from "joi";
import { User } from "../../../commons/database/SQL/index.mjs";
import { lambdaProcessor, Logger } from "../../../commons/utils/index.mjs";

const $logger = new Logger("ecommerce:User:readUser");

const requestShape = Joi.object({
  UserID: Joi.string().guid({ version: "uuidv4" }).required(),
});

export const handler = lambdaProcessor(
  async (body) => {
    const order = await User.findOne({
      where: {
        UserDeletedAt: null,
        UserID: body.UserID,
      },
    });

    return { statusCode: 200, body: order };
  },
  requestShape,
  $logger
);
