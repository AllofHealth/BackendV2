import { Test, TestingModule } from '@nestjs/testing';
import { TermillService } from './termill.service';
import { TermillProvider } from '../dao/termill.dao';

describe('TermillService', () => {
  let service: TermillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermillService, TermillProvider],
    }).compile();

    service = module.get<TermillService>(TermillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('SMS Delivery', () => {
    it('Should send an sms successfully', async () => {
      const data = {
        to: '2349122145480',
        sms: 'This is a test message',
      };

      const result = await service.sendSMS(data);
      console.log(result);
    }, 50000);
  });
});
