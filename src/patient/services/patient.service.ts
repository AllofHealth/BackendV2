import { Injectable, Logger } from '@nestjs/common';
import { Patient } from '../schemas/patient.schema';
import { CreatePatientType } from '../interface/patient.interface';
import { ErrorCodes, PatientError } from 'src/shared';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { PatientDao } from '../dao/patient.dao';
import { PatientGuard } from '../guards/patient.guard';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    private readonly patientDao: PatientDao,
    private readonly patientGuard: PatientGuard,
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
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);
      if (patientExist) {
        throw new PatientError('Patient already exist');
      }
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
    try {
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);

      if (!patientExist) {
        return {
          success: ErrorCodes.NotFound,
          message: 'Patient not found',
        };
      }
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);
      return {
        success: ErrorCodes.Success,
        patient,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new PatientError('An error occurred while fetching patient');
    }
  }

  async deletePatientByAddress(walletAddress: string) {
    return await this.patientModel.deleteOne({ walletAddress });
  }
}
