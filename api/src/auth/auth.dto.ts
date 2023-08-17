import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}

export class RefreshRequestDto {
  @IsString()
  refreshToken: string;
}

export class RefreshResponseDto {
  @IsString()
  accessToken: string;
}
