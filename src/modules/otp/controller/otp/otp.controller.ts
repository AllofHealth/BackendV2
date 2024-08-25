import { Controller, Post, Query, ValidationPipe } from '@nestjs/common';
import { OtpService } from '@/modules/otp/services/otp.service';
import { RoleType } from '../../interface/otp.interface';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('resendOTP')
  resendOTP(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('role', new ValidationPipe({ transform: true })) role: RoleType,
  ) {
    return this.otpService.resendOtp(walletAddress, role);
  }

  @Post('verify')
  verifyOTP(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('role', new ValidationPipe({ transform: true })) role: RoleType,
    @Query('otp', new ValidationPipe({ transform: true })) otp: string,
  ) {
    return this.otpService.verifyOtp(walletAddress, otp, role);
  }
}
