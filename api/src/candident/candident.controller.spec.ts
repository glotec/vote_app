import { Test, TestingModule } from '@nestjs/testing';
import { CandidentController } from './candident.controller';
import { CandidentService } from './candident.service';

describe('CandidentController', () => {
  let controller: CandidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidentController],
      providers: [CandidentService],
    }).compile();

    controller = module.get<CandidentController>(CandidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
