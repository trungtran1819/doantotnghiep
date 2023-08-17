import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionDto } from './session.dto';

export const Session = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const user = request.user;

  const session = new SessionDto();
  session.userId = user.sub;
  session.role = user.role;

  return session;
});
