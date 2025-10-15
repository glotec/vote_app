import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    username: string;
    // Add other fields as needed
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prismaService: PrismaService,
  ) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number; username: string }) {
    const user = await this.prismaService.users.findUnique({
      where: { username: payload.username },
    });

    if (user) {
      const { password: _password, ...userWithoutPassword } = user;
      void _password;
      return userWithoutPassword;
    }

    return null;
  }
}
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   async validate(payload: { sub: number; username: string }) {
//     const user = await this.prismaService.users.findUnique({
//       where: { username: payload.username },
//     });
//     if (user) {
//       const { password: _password, ...userWithoutPassword } = user;
//       void _password;
//       return userWithoutPassword;
//     }
//     return null;
//     // throw new Error('Method not implemented.');
//   }
//   constructor(
//     config: ConfigService,
//     private prismaService: PrismaService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: config.get<string>('JWT_SECRET')!,
//     });
//   }
// }

// export const GetUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest<Request>();
//     return request.user;
//   },
// );
// export const GetUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user; // Return the user object attached to the request
//   },
// );
