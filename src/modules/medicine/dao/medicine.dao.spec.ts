import { Test, TestingModule } from '@nestjs/testing';
import { MedicineDao } from './medicine.dao';

describe('Medicine', () => {
  let provider: MedicineDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineDao],
    }).compile();

    provider = module.get<MedicineDao>(MedicineDao);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
