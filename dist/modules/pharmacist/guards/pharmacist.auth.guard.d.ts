import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
export declare class PharmacistAuthGuard implements CanActivate {
    private readonly pharmacistDao;
    constructor(pharmacistDao: PharmacistDao);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class PharmacistVerificationGuard implements CanActivate {
    private readonly pharmacistDao;
    constructor(pharmacistDao: PharmacistDao);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class PharmacistExist implements CanActivate {
    private readonly pharmacistDao;
    constructor(pharmacistDao: PharmacistDao);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
