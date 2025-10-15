import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService], // Make sure RedisService is exported
})
export class RedisModule {}
