import { Injectable, UnauthorizedException } from "@nestjs/common";
import {
  LoginUserInputDto,
  RegisterUserInputDto,
  LoginUserResponseDto,
} from "@infrastructure/dto/User/index";
import { LoginUserUseCase, RegisterUserUseCase } from "@usecases/User/index";
import { RegisterUserResponseDto } from "@infrastructure/dto/User/register-user-response.dto";

@Injectable()
export class UserService {
  constructor(
    private loginUserUseCase: LoginUserUseCase,
    private registerUserUseCase: RegisterUserUseCase
  ) {}

  async loginUser(
    LoginUserInputDto: LoginUserInputDto
  ): Promise<LoginUserResponseDto> {
    try {
      return await this.loginUserUseCase.execute(LoginUserInputDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async registerUser(
    RegisterUserInputDto: RegisterUserInputDto
  ): Promise<RegisterUserResponseDto> {
    return await this.registerUserUseCase.execute(RegisterUserInputDto);
  }
}
