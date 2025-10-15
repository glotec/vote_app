import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { StudentModule } from './student/student.module';
import { PicModule } from './pic/pic.module';
import { CandidentModule } from './candident/candident.module';
import { UserRoleModule } from './user-role/user-role.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    UserRoleModule,
    CandidentModule,
    PicModule,
    StudentModule,
    VoteModule,
    RedisModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
