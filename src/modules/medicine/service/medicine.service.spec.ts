import { Test, TestingModule } from '@nestjs/testing';
import { MedicineService } from './medicine.service';
import { MedicineDao } from '../dao/medicine.dao';
import { MedicineModule } from '../medicine.module';

describe('MedicineService', () => {
  let service: MedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MedicineModule],
      providers: [MedicineService, MedicineDao],
    }).compile();

    service = module.get<MedicineService>(MedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Categories', () => {
    it('should get all categories', async () => {
      const categories = await service.getCategories();
      console.log(categories);
      expect(categories).toBeDefined();
    });
  });
});
