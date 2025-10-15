import {
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthDto, SigninDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

export interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private redisService: RedisService, // Inject the RedisService
  ) {}

  async signup(dto: AuthDto) {
    try {
      const existUser = await this.prismaService.users.findFirst({
        where: {
          username: dto.username,
        },
      });
      if (existUser) {
        return {
          statusCode: 409,
          message: 'Cet utilisateur existe déjà',
        };
      }

      const hash = await argon.hash(dto.password);

      const user = await this.prismaService.users.create({
        data: {
          fullname: dto.fullname,
          username: dto.username,
          password: hash,
          role: {
            connect: { role_id: dto.role_id }, // Make sure this role exists
          },
        },
      });

      const token = await this.signToken(user.username);
      return {
        statusCode: 201,
        message: 'Utilisateur ajouters',
        user: {
          username: user.username,
        },
        token,
      };
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: string }).code === 'P2002'
      ) {
        return {
          statusCode: 409,
          message: 'Cet utilisateur existe déjà',
        };
      }
      throw error;
    }
  }
  @HttpCode(HttpStatus.OK)
  async signin(dto: SigninDto) {
    const user = await this.prismaService.users.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      return {
        statusCode: 404,
        message: 'Utilisateur non trouvé',
      };
    }

    const match = await argon.verify(user.password, dto.password);
    if (!match) {
      return {
        statusCode: 401,
        message: 'Mot de passe incorrect',
      };
    }

    const token = await this.signToken(user.username);
    return {
      statusCode: 200,
      message: 'Connecté',
      user: {
        username: user.username,
      },
      token,
    };
  }

  async signToken(username: string): Promise<{ access_token: string }> {
    const payload = { username };

    const secret = this.config.get<string>('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15min',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  // Method to verify the token and handle expiration
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      // Verify token using JwtService
      const decoded = await this.jwt.verifyAsync<JwtPayload>(token, {
        secret: this.config.get('JWT_SECRET')!,
      });
      return decoded;
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'name' in err &&
        typeof (err as { name?: unknown }).name === 'string' &&
        (err as { name: string }).name === 'TokenExpiredError'
      ) {
        // Handle expired token error
        throw new Error('Token has expired');
      }
      throw new Error('Invalid token');
    }
  }
  // Logout method
  async logout(token: string): Promise<void> {
    try {
      // Verify the token
      await this.verifyToken(token);

      // Blacklist the token in Redis
      await this.redisService.addToBlacklist(token);

      console.log('Token blacklisted:', token);
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        console.error(
          'Error during logout:',
          (err as { message?: string }).message,
        );
      } else {
        console.error('Error during logout:', err);
      }
      throw new Error('Error logging out');
    }
  }

  // async getAllUsers() {
  //   try {
  //     const [users, count] = await this.prismaService.$transaction([
  //       this.prismaService.users.findMany({
  //         include: {
  //           role: true, // Include the role information
  //         },
  //       }),
  //       this.prismaService.users.count(),
  //     ]);

  //     return {
  //       statusCode: 200,
  //       count: count,
  //       data: {
  //         users,
  //       },
  //     };
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       this.logger.error('Get users failed:', error.message);
  //     } else {
  //       this.logger.error('Unknown error:', error);
  //     }
  //     throw new InternalServerErrorException('Could not retrieve users');
  //   }
  // }

  async getAllUsers() {
    try {
      const users = await this.prismaService.users.findMany({
        include: {
          role: true,
        },
      });

      return users.map(({ password, ...user }) => user); // Exclude password
      // return await this.prismaService.users.findMany({
      //   select: {
      //     username: true,
      //     fullname: true,
      //     role_id: true,
      //     is_connected: true,
      //     activated: true,
      //     role: {
      //       select: {
      //         role_name: true, // ou autres champs de Role
      //       },
      //     },
      //   },
      // });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Get users failed:', error.message);
      } else {
        this.logger.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Could not retrieve users');
    }
  }
}
