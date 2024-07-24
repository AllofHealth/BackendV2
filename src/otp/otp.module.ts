import { Module } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { OtpController } from './controller/otp/otp.controller';

@Module({
  providers: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
