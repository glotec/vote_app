import { UseGuards, Controller, Get } from '@nestjs/common';
import { Users } from '@prisma/client';
import { AuthGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@Controller('api/vote/v1/users')
export class UserController {
  @Get('me')
  @UseGuards(AuthGuard)
  getMe(
    @GetUser() user: Partial<Users>, // Use Partial to handle optional fields
  ) {
    return {
      username: user.username,
      name: user.fullname,
      is_connected: user.is_connected,
      activated: user.activated,
    }; // Return only necessary fields
  }
  // getMe() {
  //   return { message: 'Authenticated' };
  // }
}
