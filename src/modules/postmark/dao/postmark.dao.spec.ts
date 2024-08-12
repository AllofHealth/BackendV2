import { Test, TestingModule } from '@nestjs/testing';
import { PostmarkDao } from './postmark.dao';

describe('Postmark', () => {
  let provider: PostmarkDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostmarkDao],
    }).compile();

    provider = module.get<PostmarkDao>(PostmarkDao);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('Templates', () => {
    it('should fetch templates', async () => {
      const result = await provider.fetchTemplates();

      console.log(result);
      expect(result).toBeDefined();
    });
  });
});
