import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PatientDao } from '../dao/patient.dao';
export declare class PatientAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class PatientVerificationGuard implements CanActivate {
    private readonly patientDao;
    constructor(patientDao: PatientDao);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class FamilyMemberGuard implements CanActivate {
    private readonly patientDao;
    constructor(patientDao: PatientDao);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
