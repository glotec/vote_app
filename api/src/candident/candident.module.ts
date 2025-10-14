import { Module } from '@nestjs/common';
import { CandidentService } from './candident.service';
import { CandidentController } from './candident.controller';

@Module({
  controllers: [CandidentController],
  providers: [CandidentService],
})
export class CandidentModule {}
