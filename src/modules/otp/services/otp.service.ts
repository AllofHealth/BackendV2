import { HttpStatus, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { OtpEntry } from '../interface/otp.interface';
import { OtpDao } from '../dao/otp.dao';

@Injectable()
export class OtpService {
  private otpStore: Map<string, OtpEntry> = new Map();
  private readonly expirationTime = 1000 * 60 * 5; //5 minutes

  constructor(private readonly otpDao: OtpDao) {}

  generateSecret(): string {
    return authenticator.generateSecret();
  }

  async generateOtp(secret: string) {
    const otp = authenticator.generate(secret);
    const expiresAt = Date.now() + this.expirationTime;
    try {
      const result = await this.otpDao.createOtp(
        secret,
        otp,
        new Date(expiresAt),
      );
      if (!result) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'otp not created',
        };
      }

      return {
        success: HttpStatus.OK,
        otp,
        expiresAt,
        message: 'otp created',
      };
    } catch (error) {
      console.error(error);
      throw new Error('error while generating otp');
    }
  }

  async verifyOtp(secret: string, otp: string) {
    try {
      const entry = await this.otpDao.findOtp(secret);
      if (!entry) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'no entry',
        };
      }

      if (new Date(Date.now()) > entry.expirationTime) {
        await this.otpDao.deleteOtp(secret);
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'otp expired',
        };
      }
      const isValid = authenticator.verify({ token: otp, secret });
      if (!isValid) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'otp invalid',
        };
      }
      await this.otpDao.deleteOtp(secret);
      return {
        success: HttpStatus.OK,
        message: 'otp verified',
        isValid,
      };
    } catch (error) {
      console.error(error);
      throw new Error('error while verifying otp');
    }
  }
}
