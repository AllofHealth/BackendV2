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

  describe('Providers', () => {
    it('should provide a valid url', () => {
      const url = provider.provideUrl();
      console.log(url);
      expect(url).toBe('https://v3.api.termii.com/sms/send');
    });

    it('should return a data object', () => {
      const data = provider.constructBody({
        to: '08076000000',
        sms: 'Hello World',
      });

      console.log(data);
      expect(typeof data).toBe('object');
    });
  });
});
