import { DoctorDao } from '../dao/doctor.dao';
import { HospitalDao } from 'src/modules/hospital/dao/hospital.dao';
export declare class DoctorGuard {
    private readonly doctorDao;
    private readonly hospitalDao;
    constructor(doctorDao: DoctorDao, hospitalDao: HospitalDao);
    validateDoctorExistsInHospital(hospitalId: number, doctorAddress: string): Promise<boolean>;
    validateDoctorExists(address: string): Promise<boolean>;
}
