import { Test, TestingModule } from '@nestjs/testing';
import { DailyMedService } from './daily_med.service';

describe('DailyMedService', () => {
  let service: DailyMedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyMedService],
    }).compile();

    service = module.get<DailyMedService>(DailyMedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
