import { CanActivate, ExecutionContext } from '@nestjs/common';
import { DoctorDao } from '../dao/doctor.dao';
export declare class DoctorAuthGuard implements CanActivate {
    private readonly doctorDao;
    constructor(doctorDao: DoctorDao);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
