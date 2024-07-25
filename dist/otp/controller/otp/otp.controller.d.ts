import { OtpService } from 'src/otp/services/otp.service';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    generateOTP(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        otp?: undefined;
        expiresAt?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        otp: string;
        expiresAt: number;
        message: string;
    }>;
    verifyOTP(walletAddress: string, otp: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        isValid?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        isValid: true;
    }>;
}
