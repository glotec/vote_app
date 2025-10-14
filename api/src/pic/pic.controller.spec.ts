import { Test, TestingModule } from '@nestjs/testing';
import { PicController } from './pic.controller';
import { PicService } from './pic.service';

describe('PicController', () => {
  let controller: PicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicController],
      providers: [PicService],
    }).compile();

    controller = module.get<PicController>(PicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
