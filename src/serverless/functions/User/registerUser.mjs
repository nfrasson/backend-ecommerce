import Joi from "joi";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { lambdaProcessor } from "../../../commons/utils/index.mjs";
import { User } from "../../../commons/database/SQL/index.mjs";

const requestShape = Joi.object({
  UserName: Joi.string().required(),
  UserPhone: Joi.string().required(),
  UserAddress: Joi.string().required(),
  UserPassword: Joi.string().required(),
  UserEmail: Joi.string().email().required(),
});

export const handler = lambdaProcessor(async (body) => {
  const { UserPassword, ...userData } = body;

  const user = {
    ...userData,
    UserID: randomUUID(),
    UserPasswordHash: await bcrypt.hash(UserPassword, 10),
  };

  const createdUser = await User.create(user);

  return { statusCode: 201, body: createdUser };
}, requestShape);
