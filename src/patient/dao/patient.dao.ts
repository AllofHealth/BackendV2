import { Patient } from '../schemas/patient.schema';
import { Category } from 'src/shared';
import {
  CreatePatientType,
  UpdatePatientProfileType,
} from '../interface/patient.interface';
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
      email: patient.email,
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

  async updatePatient(
    walletAddress: string,
    updateData: UpdatePatientProfileType,
  ) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    return await this.patientModel.updateOne(
      { walletAddress },
      { $set: updates },
      { new: true, runValidators: true },
    );
  }

  async DeletePatient(walletAddress: string) {
    return await this.patientModel.deleteOne({ walletAddress });
  }
}
