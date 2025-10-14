import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { StudentModule } from './student/student.module';
import { PicModule } from './pic/pic.module';
import { CandidentModule } from './candident/candident.module';
import { UserRoleModule } from './user-role/user-role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, UserRoleModule, CandidentModule, PicModule, StudentModule, VoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
