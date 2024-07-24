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
      const secret = service.generateSecret();
      const otp = service.generateOtp(secret);
      console.log(otp);
      const isValid = service.verifyOtp(secret, otp);

      console.log(isValid);
      expect(otp).toBeDefined();
      expect(isValid).toBe(true);
    });
  });
});
