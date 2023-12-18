import {
  AppDataSource,
  connectDatabase,
} from "../../../db/typeorm/typeorm.connection.mjs";
import { LambdaDefaultHandler } from "../../lambda-default.handler.mjs";
import { APIFunction } from "../../../../domain/types/api-function.type.mjs";
import { LoginUser } from "../../../../domain/entities/User/login-user.entity.mjs";
import { LoginUserUseCase } from "../../../../usecases/User/login-user.usecase.mjs";
import { UserRepository } from "../../../db/typeorm/repositories/typeorm.user.repository.mjs";

const userRepository = new UserRepository(AppDataSource);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export const login: APIFunction = async (body: LoginUser) => {
  const response = await loginUserUseCase.execute(body);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = new LambdaDefaultHandler(
  login,
  LoginUser,
  connectDatabase
).handleAPIGatewayEvent;
