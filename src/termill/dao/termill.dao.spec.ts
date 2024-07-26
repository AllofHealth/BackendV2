import { Test, TestingModule } from '@nestjs/testing';
import { TermillProvider } from './termill.dao';

describe('Termill', () => {
  let provider: TermillProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermillProvider],
    }).compile();

    provider = module.get<TermillProvider>(TermillProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
