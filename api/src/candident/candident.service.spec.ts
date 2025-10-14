import { Test, TestingModule } from '@nestjs/testing';
import { CandidentService } from './candident.service';

describe('CandidentService', () => {
  let service: CandidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidentService],
    }).compile();

    service = module.get<CandidentService>(CandidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
