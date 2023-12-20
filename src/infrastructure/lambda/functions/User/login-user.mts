import { LambdaDefaultHandler } from "../../lambda-default.handler.mjs";
import { APIFunction } from "../../../../domain/types/api-function.type.mjs";
import { LoginUserUseCase } from "../../../../usecases/User/login-user.usecase.mjs";
import { LoginUserDto } from "../../../../infrastructure/dto/User/login-user.dto.mjs";
import { TypeOrmUserRepository } from "../../../db/typeorm/repositories/typeorm.user.repository.mjs";

const userRepository = new TypeOrmUserRepository();
const loginUserUseCase = new LoginUserUseCase(userRepository);

export const login: APIFunction = async (body: LoginUserDto) => {
  const response = await loginUserUseCase.execute(body);

  return {
    statusCode: 200,
    body: response,
  };
};

export const handler = new LambdaDefaultHandler(login, LoginUserDto)
  .handleAPIGatewayEvent;
