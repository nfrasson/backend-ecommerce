import { IsString, IsEmail, Length } from "class-validator";

export class LoginUser {
  @IsEmail()
  userEmail: string;

  @IsString()
  @Length(6, 100)
  userPassword: string;

  constructor(props: LoginUser) {
    Object.assign(this, props);
  }
}
