import { HttpStatus } from '@nestjs/common';
import { OtpDao } from '../dao/otp.dao';
import { PostmarkService } from '@/modules/postmark/service/postmark.service';
import { RoleType } from '../interface/otp.interface';
import { EntityCreatedDto } from '@/shared/dto/shared.dto';
export declare class OtpService {
    private readonly otpDao;
    private readonly postmarkService;
    private readonly logger;
    private readonly expirationTime;
    constructor(otpDao: OtpDao, postmarkService: PostmarkService);
    private cleanUp;
    generateOtp(secret: string, role: RoleType): Promise<{
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
    verifyUser(walletAddress: string, role: RoleType): Promise<void>;
    verifyOtp(secret: string, otp: string, role: RoleType): Promise<{
        success: HttpStatus;
        message: string;
        isValid?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        isValid: boolean;
    }>;
    deliverOtp(args: EntityCreatedDto): Promise<void>;
    resendOtp(walletAddress: string, role: RoleType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
}
