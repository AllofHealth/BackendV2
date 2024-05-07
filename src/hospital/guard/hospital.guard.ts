import { Injectable } from '@nestjs/common';
import { HospitalDao } from '../dao/hospital.dao';
import { HospitalError } from 'src/shared';
import { HospitalType } from '../interface/hospital.interface';
import { Types } from 'mongoose';

@Injectable()
export class HospitalGuard {
  constructor(private readonly hospitalDao: HospitalDao) {}

  async validateHospitalAdmin(hospital: HospitalType, adminAddress: string) {
    if (!hospital || !adminAddress || adminAddress.length !== 42) {
      throw new HospitalError('Error validating parameters');
    }

    let isAdmin = false;
    try {
      if (hospital.admin === adminAddress) {
        isAdmin = true;
      }
      return isAdmin;
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error validating admin');
    }
  }

  async validateHospitalExists(hospitalId: Types.ObjectId) {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }
    try {
      let hospitalExist = false;
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      if (hospital) {
        hospitalExist = true;
      }
      return hospitalExist;
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error validating hospital');
    }
  }
}
