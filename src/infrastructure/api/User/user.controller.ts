import { UserService } from "./user.service";
import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import {
  LoginUserInputDto,
  LoginUserResponseDto,
  RegisterUserInputDto,
} from "@infrastructure/dto/User/index";
import { SkipAuth } from "../utils/decorators/skip-auth.decorator";

@Controller("users")
@ApiTags("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipAuth()
  @Post("login")
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({
    status: 200,
    description: "User logged in successfully",
    type: LoginUserResponseDto,
  })
  async loginUser(@Body() body: LoginUserInputDto) {
    return await this.userService.loginUser(body);
  }

  @SkipAuth()
  @Post("register")
  @ApiOperation({ summary: "Register user" })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    type: null,
  })
  async registerUser(@Body() body: RegisterUserInputDto) {
    return await this.userService.registerUser(body);
  }
}
