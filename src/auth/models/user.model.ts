import { IsString, IsNumber, IsEmail } from "class-validator";

export enum IGrant {
  ADMIN = 0,
  EDITOR = 1,
  READER = 2,
}

export class UserModel {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  grant: IGrant;
}