import { Controller, Post, Query, ValidationPipe } from '@nestjs/common';
import { OtpService } from 'src/modules/otp/services/otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate')
  generateOTP(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return this.otpService.generateOtp(walletAddress);
  }

  @Post('verify')
  verifyOTP(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('otp', new ValidationPipe({ transform: true })) otp: string,
  ) {
    return this.otpService.verifyOtp(walletAddress, otp);
  }
}
