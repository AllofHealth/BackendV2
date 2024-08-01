import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';

describe('OtpService', () => {
  let service: OtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpService],
    }).compile();

    service = module.get<OtpService>(OtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('OTP', () => {
    it('Should generate secret', () => {
      const secret = service.generateSecret();
      console.log(secret);
      expect(secret).toBeDefined();
    });

    it('Should generate OTP and verify otp', () => {
      const secret = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      const otp = service.generateOtp(secret);
      console.log(otp);
      const isValid = service.verifyOtp(secret, otp);

      console.log(isValid);
      expect(otp).toBeDefined();
      expect(isValid).toBe(true);
    });
  });
});
