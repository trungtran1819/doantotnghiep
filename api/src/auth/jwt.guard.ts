import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();

      const token = this.getToken(request);

      const user = this.jwtService.verify(token);

      request.user = user;

      return true;
    } catch (e) {
      return false;
    }
  }

  private getToken(request: { headers: Record<string, string> }): string {
    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new Error('Invalid authorization header!');
    }

    const [_, token] = authorization.split(' ');

    return token;
  }
}
