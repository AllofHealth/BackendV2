import {
  Patient,
  FamilyMember,
  Prescriptions,
  MedicalRecordPreview,
} from '../schemas/patient.schema';
import { Category } from 'src/shared';
import {
  CreateApprovalType,
  CreateFamilyMemberType,
  CreatePatientType,
  CreatePrescriptionInterface,
  MedicalRecordPreviewType,
  UpdateFamilyMemberType,
  UpdatePatientProfileType,
  UpdatePrescriptionInterface,
} from '../interface/patient.interface';
import { PROFILE_PLACEHOLDER } from 'src/shared/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Approval, Doctor } from 'src/doctor/schema/doctor.schema';

@Injectable()
export class PatientDao {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(FamilyMember.name)
    private familyMemberModel: Model<FamilyMember>,
    @InjectModel(Prescriptions.name)
    private prescriptionsModel: Model<Prescriptions>,

    @InjectModel(Approval.name)
    private readonly approvalModel: Model<Approval>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,

    @InjectModel(MedicalRecordPreview.name)
    private readonly medicalRecordPreviewModel: Model<MedicalRecordPreview>,
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
      doctorAddress: prescription.doctorAddress,
      medicineName: prescription.medicineName,
      medicineId: prescription.medicineId ? prescription.medicineId : '',
      medicineGroup: prescription.medicineGroup
        ? prescription.medicineGroup
        : '',
      description: prescription.description,
      sideEffects: prescription.sideEffects ? prescription.sideEffects : '',
    });
  }

  async createApproval(args: CreateApprovalType) {
    return await this.approvalModel.create({
      patientId: args.patientId,
      patientName: args.patientName,
      recordId: args.recordId,
      profilePicture: args.profilePicture,
      approvalType: args.approvalType,
      approvalStatus: args.approvalStatus,
      approvalDuration: args.approvalDuration,
      recordOwner: args.recordOwner,
    });
  }

  async createMedicalRecordPreview(args: MedicalRecordPreviewType) {
    return await this.medicalRecordPreviewModel.create({
      id: args.recordId,
      principalPatient: args.principalPatientAddress,
      doctorAddress: args.doctorAddress,
      diagnosis: args.diagnosis,
      doctorsName: args.doctorsName,
      hospitalName: args.hospitalName,
      date: Date.now(),
    });
  }

  async fetchPatientByAddress(walletAddress: string) {
    return await this.patientModel.findOne({ walletAddress });
  }

  async fetchAllPatients() {
    return await this.patientModel.find();
  }

  async pullOnePrescription(
    prescriptionId: Types.ObjectId,
    walletAddress: string,
  ) {
    return await this.patientModel.updateOne(
      { walletAddress: walletAddress },
      { $pull: { prescriptions: { _id: prescriptionId } } },
    );
  }

  async pullOneApproval(
    doctorAddress: string,
    patientAddress: string,
    recordId: Types.ObjectId,
  ) {
    return await this.doctorModel.updateOne(
      { walletAddress: doctorAddress },
      {
        $pull: {
          activeApprovals: {
            recordOwner: patientAddress,
            _id: recordId,
          },
        },
      },
    );
  }

  async pullPatientApprovals(doctorAddress: string, patientAddress: string) {
    return await this.doctorModel.updateOne(
      { walletAddress: doctorAddress },
      {
        $pull: {
          activeApprovals: {
            recordOwner: patientAddress,
          },
        },
      },
    );
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

  async updatePatientPrescription(
    walletAddress: string,
    recordId: number,
    updateData: UpdatePrescriptionInterface,
  ) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      acc[`prescriptions.$.${key}`] = updateData[key];
      return acc;
    }, {});

    return await this.patientModel.updateOne(
      { walletAddress, 'prescriptions.recordId': recordId },
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

  async findOneRecord(walletAddress: string, recordId: number) {
    const record = await this.patientModel.findOne(
      { walletAddress, 'medicalRecords.recordId': recordId },
      { 'medicalRecords.$': 1 },
    );

    if (!record) {
      return {
        success: HttpStatus.NOT_FOUND,
        message: 'Record not found',
      };
    }
    return record.medicalRecords[0];
  }
}
