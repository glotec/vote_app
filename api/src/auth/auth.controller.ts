import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpStatus,
  HttpCode,
  Get,
  // UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, SigninDto } from './dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('api/vote/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const authHeader = req.headers['authorization'];
      const token =
        typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
          ? authHeader.split(' ')[1]
          : undefined;

      if (!token) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'No token provided.',
        });
      }

      // Verify and decode the token
      await this.authService.logout(token);

      return res.status(HttpStatus.OK).json({
        message: 'Successfully logged out.',
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message || 'Error logging out.',
      });
    }
  }

  @Get('users')
  // @UseGuards(AuthGuard)
  // @Get()
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
