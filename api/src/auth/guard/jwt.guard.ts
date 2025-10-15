import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      // Verify token validity
      const user = await this.authService.verifyToken(token);

      // Attach the user to the request object
      request.user = user;

      // Check if token is blacklisted
      const isBlacklisted = await this.redisService.isBlacklisted(token);
      if (isBlacklisted) {
        throw new Error('Token has been blacklisted');
      }

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error verifying token:', err.message);
      } else {
        console.error('Unknown error during token verification:', err);
      }
      return false;
    }
  }

  handleRequest(
    err: Error | null,
    user: Record<string, any> | null,
  ): Record<string, any> {
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
