import { Test, TestingModule } from '@nestjs/testing';
import { TermillService } from './termill.service';

describe('TermillService', () => {
  let service: TermillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermillService],
    }).compile();

    service = module.get<TermillService>(TermillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
