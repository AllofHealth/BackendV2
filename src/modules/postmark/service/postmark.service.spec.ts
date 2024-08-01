import { Test, TestingModule } from '@nestjs/testing';
import { PostmarkService } from './postmark.service';
import { PostmarkDao } from '../dao/postmark.dao';

describe('PostmarkService', () => {
  let service: PostmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostmarkService, PostmarkDao],
    }).compile();

    service = module.get<PostmarkService>(PostmarkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Email Delivery', () => {
    it('Should successfully send an email', async () => {
      const result = await service.sendEmail({
        to: 'preciousegbu@gmail.com',
        otp: '123456',
      });

      console.log(result);
    }, 50000);
  });
});
