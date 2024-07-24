import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { OtpEntry } from '../interface/otp.interface';

@Injectable()
export class OtpService {
  private otpStore: Map<string, OtpEntry> = new Map();
  private readonly expirationTime = 1000 * 60 * 5; //5 minutes

  generateSecret(): string {
    return authenticator.generateSecret();
  }

  generateOtp(secret: string): string {
    const otp = authenticator.generate(secret);
    const expiresAt = Date.now() + this.expirationTime;
    this.otpStore.set(secret, { otp, expiresAt });
    return otp;
  }

  verifyOtp(secret: string, otp: string): boolean {
    const entry = this.otpStore.get(secret);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.otpStore.delete(secret);
      return false;
    }
    const isValid = authenticator.verify({ token: otp, secret });
    if (isValid) {
      this.otpStore.delete(secret);
    }
    return isValid;
  }
}
