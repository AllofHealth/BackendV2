import { OtpService } from 'src/modules/otp/services/otp.service';
import { RoleType } from '../../interface/otp.interface';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    resendOTP(walletAddress: string, role: RoleType): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    verifyOTP(walletAddress: string, role: RoleType, otp: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        isValid?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        isValid: boolean;
    }>;
}
