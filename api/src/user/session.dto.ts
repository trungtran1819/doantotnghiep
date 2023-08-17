import { Roles } from "./user.entity";

export class SessionDto {
  userId: string;
  role: Roles;
}
