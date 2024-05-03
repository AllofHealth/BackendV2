import { Injectable } from '@nestjs/common';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { PreviewType } from 'src/hospital/interface/hospital.interface';
import { PharmacistError } from 'src/shared';

@Injectable()
export class PharmacistGuard {
  constructor(private readonly hospitalDao: HospitalDao) {}
  async validatePharmacistExistsInHospital(
    hospitalId: number,
    pharmacistAddress: string,
  ) {
    if (
      !Number(hospitalId) ||
      hospitalId <= 0 ||
      !pharmacistAddress ||
      pharmacistAddress.length < 42
    ) {
      throw new PharmacistError('Invalid or missing pharmacist address');
    }

    let pharmacistExists: boolean = false;

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        hospitalId,
      );
      if (!hospital) {
        throw new PharmacistError('Hospital not found');
      }

      const pharmacist = hospital.pharmacists.find(
        (pharmacist: PreviewType) =>
          pharmacist.walletAddress === pharmacistAddress,
      );

      if (pharmacist) {
        pharmacistExists = true;
      }

      return pharmacistExists;
    } catch (error) {
      console.error(error);
      throw new PharmacistError(
        'Error validating pharmacist exists in hospital',
      );
    }
  }
}
