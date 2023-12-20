import {
  IsString,
  IsEmail,
  Length,
  IsUUID,
  IsDateString,
} from "class-validator";

export class RegisterUserDto {
  @IsUUID()
  userId: string;

  @IsString()
  @Length(2, 50)
  userFirstname: string;

  @IsString()
  @Length(2, 50)
  userLastname: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  @Length(6, 100)
  userPassword: string;

  @IsDateString()
  userBirthdate: Date;
}
