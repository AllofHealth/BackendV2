import {
  Patient,
  FamilyMember,
  Prescriptions,
} from '../schemas/patient.schema';
import { Category } from 'src/shared';
import {
  CreateFamilyMemberType,
  CreatePatientType,
  CreatePrescriptionInterface,
  UpdateFamilyMemberType,
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
    @InjectModel(FamilyMember.name)
    private familyMemberModel: Model<FamilyMember>,
    @InjectModel(Prescriptions.name)
    private prescriptionsModel: Model<Prescriptions>,
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

  async createFamilyMembers(familyMember: CreateFamilyMemberType) {
    return await this.familyMemberModel.create({
      id: familyMember.id,
      principalPatient: familyMember.principalPatient,
      name: familyMember.name,
      profilePicture: familyMember.profilePicture
        ? familyMember.profilePicture
        : PROFILE_PLACEHOLDER,
      relationship: familyMember.relationship,
      email: familyMember.email ? familyMember.email : '',
      address: familyMember.address,
      age: familyMember.age,
      dob: familyMember.dob,
      bloodGroup: familyMember.bloodGroup,
      genotype: familyMember.genotype,
    });
  }

  async createPrescription(prescription: CreatePrescriptionInterface) {
    return await this.prescriptionsModel.create({
      doctorName: prescription.doctorName,
      recordId: prescription.recordId,
      patientAddress: prescription.patientAddress,
      medicineName: prescription.medicineName,
      medicineId: prescription.medicineId ? prescription.medicineId : '',
      medicineGroup: prescription.medicineGroup
        ? prescription.medicineGroup
        : '',
      description: prescription.description,
      sideEffects: prescription.sideEffects ? prescription.sideEffects : '',
      date: Date.now(),
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

  async updateFamilyMember(
    walletAddress: string,
    familyMemberId: number,
    updateData: UpdateFamilyMemberType,
  ) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      acc[`familyMembers.$.${key}`] = updateData[key];
      return acc;
    }, {});

    return await this.patientModel.updateOne(
      { walletAddress, 'familyMembers.id': familyMemberId },
      { $set: updates },
      { new: true, runValidators: true },
    );
  }

  async DeletePatient(walletAddress: string) {
    return await this.patientModel.deleteOne({ walletAddress });
  }
}
