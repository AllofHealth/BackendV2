import { Injectable, Logger } from '@nestjs/common';
import { Patient } from '../schemas/patient.schema';
import { CreatePatientType } from '../interface/patient.interface';
import { ErrorCodes, PatientError } from 'src/shared/global';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientDao } from '../dao/patient.dao';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    public readonly patientDao: PatientDao,
  ) {}

  async createNewPatient(args: CreatePatientType) {
    const {
      id,
      name,
      age,
      address,
      city,
      walletAddress,
      bloodGroup,
      genotype,
    } = args;
    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !name ||
      !address ||
      !city ||
      !walletAddress ||
      walletAddress.length !== 42 ||
      !bloodGroup ||
      !genotype
    ) {
      throw new PatientError('Invalid parameter');
    }
    try {
      const patient = await this.patientDao.createNewPatient(args);
      console.info(patient);
      return {
        success: ErrorCodes.Success,
        patient,
        message: 'Patient created successfully',
      };
    } catch (error) {
      Logger.error(error);
      throw new PatientError('An error occurred while creating patient');
    }
  }

  async findAllPatients() {
    return await this.patientModel.find();
  }

  async fetchPatientByWalletAddress(walletAddress: string) {
    return await this.patientModel.findOne({ walletAddress });
  }

  async deletePatientByAddress(walletAddress: string) {
    return await this.patientModel.deleteOne({ walletAddress });
  }
}
