import { HttpStatus } from '@nestjs/common';
import { OtpDao } from '../dao/otp.dao';
import { PostmarkService } from '@/modules/postmark/service/postmark.service';
export declare class OtpService {
    private readonly otpDao;
    private readonly postmarkService;
    private readonly expirationTime;
    constructor(otpDao: OtpDao, postmarkService: PostmarkService);
    private cleanUp;
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
    verifyUser(walletAddress: string): Promise<void>;
    verifyOtp(secret: string, otp: string): Promise<{
        success: HttpStatus;
        message: string;
        isValid?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        isValid: boolean;
    }>;
    deliverOtp(walletAddress: string, emailAddress: string): Promise<void>;
    resendOtp(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
}
