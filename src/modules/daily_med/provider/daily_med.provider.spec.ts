import { Test, TestingModule } from '@nestjs/testing';
import { DailyMedProvider } from './daily_med.provider';

describe('DailyMed', () => {
  let provider: DailyMedProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyMedProvider],
    }).compile();

    provider = module.get<DailyMedProvider>(DailyMedProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
