import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '../redis/redis.module';
import { AuthGuard } from '../auth/guard';

@Module({
  imports: [AuthModule, RedisModule], // Ensure AuthModule is imported
  controllers: [UserController],
  providers: [AuthGuard, UserService],
})
export class UserModule {}
