import { RoleType } from '@/modules/otp/interface/otp.interface';
export declare class EntityCreatedDto {
    readonly walletAddress: string;
    readonly email: string;
    readonly role: RoleType;
    constructor(walletAddress: string, email: string, role: RoleType);
}
