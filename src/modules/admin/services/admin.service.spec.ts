import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Practitioner List', () => {
    it.only('should return a list of practitioners', async () => {
      const result = await service.fetchAllPractitioners();
      console.log(result);
    });
  });
});
