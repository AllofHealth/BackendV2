import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';
import { OtpDao } from '../dao/otp.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from '../schema/otp.schema';
import { PatientModule } from '@/modules/patient/patient.module';
import { DoctorModule } from '@/modules/doctor/doctor.module';
import { PharmacistModule } from '@/modules/pharmacist/pharmacist.module';
import { forwardRef } from '@nestjs/common';

describe('OtpService', () => {
  let service: OtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
        forwardRef(() => PatientModule),
        forwardRef(() => DoctorModule),
        forwardRef(() => PharmacistModule),
      ],
      providers: [OtpService, OtpDao],
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

    it.only('Should generate OTP and verify otp', async () => {
      const secret = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      const result = await service.generateOtp(secret);
      console.log(result.otp);
    });

    it('Should verify OTP', async () => {
      const secret = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      const otp = '842330';
      const result = await service.verifyOtp(secret, otp);
      console.log(result);
    });
  });
});
