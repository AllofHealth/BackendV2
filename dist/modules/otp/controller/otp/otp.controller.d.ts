import { OtpService } from 'src/modules/otp/services/otp.service';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    resendOTP(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    verifyOTP(walletAddress: string, otp: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        isValid?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        isValid: boolean;
    }>;
}
