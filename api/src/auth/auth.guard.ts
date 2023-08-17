import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService , private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    if (token) {
      const user = this.getUserFromToken(token);
      if (user) {
        request.user = user;
        return true;
      }
    }

    return false;
  }

  private getToken(request: { headers: Record<string, string> }): string | null {
    const authorization = request.headers['authorization'];
    if (!authorization) {
      return null;
    }

    const [_, token] = authorization.split(' ');

    return token;
  }

  private getUserFromToken(token: string) {
    try {
      const user = this.jwtService.verify(token);

      if (user) {
        return user;
      }
    } catch (_) {}
    return null;
  }
}
