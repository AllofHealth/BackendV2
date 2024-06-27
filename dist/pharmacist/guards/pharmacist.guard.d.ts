import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { PharmacistDao } from '../dao/pharmacist.dao';
export declare class PharmacistGuard {
    private readonly hospitalDao;
    private readonly pharmacistDao;
    constructor(hospitalDao: HospitalDao, pharmacistDao: PharmacistDao);
    validatePharmacistExistsInHospital(hospitalId: number, pharmacistAddress: string): Promise<boolean>;
    validatePharmacistExists(address: string): Promise<boolean>;
}
