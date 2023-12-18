import {
  AppDataSource,
  connectDatabase,
} from "../../../db/typeorm/typeorm.connection.mjs";
import { User } from "../../../../domain/entities/user.entity.mjs";
import { LambdaDefaultHandler } from "../../lambda-default.handler.mjs";
import { APIFunction } from "../../../../domain/types/api-function.type.mjs";
import { RegisterUserUseCase } from "../../../../usecases/User/register-user.usecase.mjs";
import { UserRepository } from "../../../db/typeorm/repositories/typeorm.user.repository.mjs";

const userRepository = new UserRepository(AppDataSource);
const registerUserUseCase = new RegisterUserUseCase(userRepository);

export const register: APIFunction = async (body: User) => {
  const user = await registerUserUseCase.execute(body);

  return {
    statusCode: 200,
    body: user,
  };
};

export const handler = new LambdaDefaultHandler(register, User, connectDatabase)
  .handleAPIGatewayEvent;
