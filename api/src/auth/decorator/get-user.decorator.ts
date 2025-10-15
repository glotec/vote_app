import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    username: string;
    fullname: string;
    // Add any other fields you expect on the user
    [key: string]: any;
  };
}

export const GetUser = createParamDecorator(
  (
    data: keyof AuthenticatedRequest['user'] | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (data) {
      return request.user?.[data] as string; // or stricter if needed
    }
    return request.user;
  },
);
