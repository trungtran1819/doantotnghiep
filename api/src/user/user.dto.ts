import { Roles } from "./user.entity";
import { IsEnum, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEnum(Roles)
  role: Roles;
}