import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginRequestDto, LoginResponseDto, RefreshRequestDto, RefreshResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

const ACCESS_TOKEN_TTL = '14d';
const REFRESH_TOKEN_TTL = '14d';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken(payload: any, expiresIn: string): string {
    return this.jwtService.sign(
      {
        ...payload,
      },
      { expiresIn },
    );
  }

  async login({
    username,
    password
  }: LoginRequestDto): Promise<LoginResponseDto> {

    let user = await this.userService.findByUserNameAndPassword(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      accessToken: this.generateToken(
        {
          sub: user.id,
          role: user.role,
        },
        ACCESS_TOKEN_TTL,
      ),
      refreshToken: this.generateToken({ sub: user.id }, REFRESH_TOKEN_TTL),
    };
  }

  async refresh({ refreshToken }: RefreshRequestDto): Promise<RefreshResponseDto> {
    const payload = this.jwtService.verify(refreshToken);

    const user = await this.userService.findOneById(payload.sub);

    return {
      accessToken: this.generateToken(
        {
          sub: user.id,
          role: user.role,
        },
        ACCESS_TOKEN_TTL,
      ),
    };
  }
}
