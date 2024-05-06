import { Injectable } from '@nestjs/common';
import { PatientDao } from '../dao/patient.dao';

@Injectable()
export class PatientGuard {
  constructor(private readonly patientDao: PatientDao) {}

  async validatePatient(walletAddress: string) {
    let patientExist: boolean = false;
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);
      if (patient) {
        patientExist = true;
      }

      return patientExist;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while validating patient');
    }
  }
}
