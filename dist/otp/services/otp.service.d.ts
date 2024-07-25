import { HttpStatus } from '@nestjs/common';
import { OtpDao } from '../dao/otp.dao';
export declare class OtpService {
    private readonly otpDao;
    private otpStore;
    private readonly expirationTime;
    constructor(otpDao: OtpDao);
    generateSecret(): string;
    generateOtp(secret: string): Promise<{
        success: HttpStatus;
        message: string;
        otp?: undefined;
        expiresAt?: undefined;
    } | {
        success: HttpStatus;
        otp: string;
        expiresAt: number;
        message: string;
    }>;
    verifyOtp(secret: string, otp: string): Promise<{
        success: HttpStatus;
        message: string;
        isValid?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        isValid: true;
    }>;
}
