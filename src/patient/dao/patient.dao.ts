import { Patient } from '../schemas/patient.schema';
import { Category } from 'src/shared/global';
import { CreatePatientType } from '../interface/patient.interface';
import { PROFILE_PLACEHOLDER } from 'src/shared/constants';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PatientDao {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}
  async createNewPatient(patient: CreatePatientType) {
    return await this.patientModel.create({
      id: patient.id,
      appointmentCount: 0,
      name: patient.name,
      age: patient.age,
      profilePicture: patient.profilePicture
        ? patient.profilePicture
        : PROFILE_PLACEHOLDER,
      address: patient.address,
      city: patient.city,
      walletAddress: patient.walletAddress,
      bloodGroup: patient.bloodGroup,
      genotype: patient.genotype,
      category: Category.Patient,
    });
  }

  async fetchPatientByAddress(walletAddress: string) {
    return await this.patientModel.findOne({ walletAddress });
  }

  async fetchAllPatients() {
    return await this.patientModel.find();
  }

  async DeletePatient(walletAddress: string) {
    return await this.patientModel.deleteOne({ walletAddress });
  }
}
