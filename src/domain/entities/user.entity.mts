import { randomUUID } from "node:crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
  IsString,
  IsEmail,
  Length,
  IsUUID,
  IsDateString,
} from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  userId: string;

  @Column()
  @IsString()
  @Length(2, 50)
  userFirstname: string;

  @Column()
  @IsString()
  @Length(2, 50)
  userLastname: string;

  @Column({ unique: true })
  @IsEmail()
  userEmail: string;

  @Column()
  @IsString()
  @Length(6, 100)
  userPassword: string;

  @Column("date")
  @IsDateString()
  userBirthdate: Date;

  constructor(props: User) {
    Object.assign(this, props);
    this.userId = props?.userId || randomUUID();
  }
}
