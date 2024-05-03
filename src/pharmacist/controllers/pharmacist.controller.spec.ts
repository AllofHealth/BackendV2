import { Test, TestingModule } from '@nestjs/testing';
import { PharmacistController } from './pharmacist.controller';

describe('PharmacistController', () => {
  let controller: PharmacistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacistController],
    }).compile();

    controller = module.get<PharmacistController>(PharmacistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
