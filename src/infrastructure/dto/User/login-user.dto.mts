import { IsString, IsEmail, Length } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @Length(6, 100)
  userPassword: string;
}
