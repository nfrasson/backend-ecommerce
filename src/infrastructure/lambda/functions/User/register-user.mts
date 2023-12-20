import { LambdaDefaultHandler } from "../../lambda-default.handler.mjs";
import { APIFunction } from "../../../../domain/types/api-function.type.mjs";
import { RegisterUserUseCase } from "../../../../usecases/User/register-user.usecase.mjs";
import { RegisterUserDto } from "../../../../infrastructure/dto/User/register-user.dto.mjs";
import { TypeOrmUserRepository } from "../../../db/typeorm/repositories/typeorm.user.repository.mjs";

const userRepository = new TypeOrmUserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);

export const register: APIFunction = async (body: RegisterUserDto) => {
  const user = await registerUserUseCase.execute(body);

  return {
    statusCode: 201,
    body: user,
  };
};

export const handler = new LambdaDefaultHandler(register, RegisterUserDto)
  .handleAPIGatewayEvent;
