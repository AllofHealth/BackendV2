import { Injectable } from '@nestjs/common';
import { DoctorDao } from '../dao/doctor.dao';
import { DoctorError } from 'src/shared';
import { PreviewType } from 'src/hospital/interface/hospital.interface';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';

@Injectable()
export class DoctorGuard {
  constructor(
    private readonly doctorDao: DoctorDao,
    private readonly hospitalDao: HospitalDao,
  ) {}

  async validateDoctorExistsInHospital(
    hospitalId: number,
    doctorAddress: string,
  ): Promise<boolean> {
    if (!hospitalId) {
      throw new DoctorError('Invalid or missing doctor address');
    }

    let doctorExists: boolean = false;

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        hospitalId,
      );
      if (!hospital) {
        throw new DoctorError('Hospital not found');
      }

      const doctor = hospital.doctors.find(
        (doctor: PreviewType) => doctor.walletAddress === doctorAddress,
      );
      if (doctor) {
        doctorExists = true;
      }

      return doctorExists;
    } catch (error) {
      console.error(error);
      throw new DoctorError('Error validating doctor exists in hospital');
    }
  }

  async validateDoctorExists(address: string) {
    try {
      const doctor = await this.doctorDao.fetchDoctorByAddress(address);

      if (!doctor) throw new DoctorError('Doctor not found');
      return doctor;
    } catch (error) {
      console.error(error);
      throw new DoctorError('Error validating doctor exists');
    }
  }
}
