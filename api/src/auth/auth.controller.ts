import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto, RefreshRequestDto, RefreshResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      return await this.authService.login(body);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshRequestDto): Promise<RefreshResponseDto> {
    try {
      return await this.authService.refresh(body);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }
}
