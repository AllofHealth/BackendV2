import { PatientDao } from '../dao/patient.dao';
export declare class PatientGuard {
    private readonly patientDao;
    constructor(patientDao: PatientDao);
    validatePatient(walletAddress: string): Promise<boolean>;
}
