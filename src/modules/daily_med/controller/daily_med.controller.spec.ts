import { Test, TestingModule } from '@nestjs/testing';
import { DailyMedController } from './daily_med.controller';

describe('DailyMedController', () => {
  let controller: DailyMedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyMedController],
    }).compile();

    controller = module.get<DailyMedController>(DailyMedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
