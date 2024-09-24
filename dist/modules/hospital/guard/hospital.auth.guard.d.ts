import { CanActivate, ExecutionContext } from '@nestjs/common';
import { HospitalDao } from '../dao/hospital.dao';
export declare class HospitalAuthGuard implements CanActivate {
    private readonly hospitalDao;
    constructor(hospitalDao: HospitalDao);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
