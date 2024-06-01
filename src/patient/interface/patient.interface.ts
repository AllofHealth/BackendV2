import { Types } from 'mongoose';

export type ApprovalType = 'view' | 'full';
export type RelationShipType =
  | 'father'
  | 'mother'
  | 'brother'
  | 'sister'
  | 'aunt'
  | 'uncle'
  | 'cousin'
  | 'nephew'
  | 'niece'
  | 'grandfather'
  | 'grandmother'
  | 'grandson'
  | 'granddaughter'
  | 'son'
  | 'daughter'
  | 'wife'
  | 'husband'
  | 'friend'
  | 'other';

export interface MedicalRecordPreviewType {
  recordId: number;
  diagnosis: string;
  doctorsName: string;
  hospitalName: string;
  date: Date;
}

export interface FamilyMemberType {
  id: number;
  principalPatient?: string;
  name: string;
  profilePicture?: string;
  relationship: string;
  email?: string;
  address: string;
  age: number;
  dob: string;
  bloodGroup: string;
  genotype: string;
  medicalRecord?: MedicalRecordPreviewType[];
}

export interface CreateFamilyMemberType {
  id: number;
  principalPatient?: string;
  name: string;
  profilePicture?: string;
  relationship: string;
  email?: string;
  address: string;
  age: number;
  dob: Date;
  bloodGroup: string;
  genotype: string;
  medicalRecord?: MedicalRecordPreviewType[];
}

export interface CreatePatientType {
  id: number;
  name: string;
  lastName?: string;
  age: number;
  email: string;
  profilePicture?: string;
  address: string;
  city: string;
  walletAddress: string;
  bloodGroup: string;
  genotype: string;
  category?: string;
}

export interface UpdateFamilyMemberType {
  name?: string;
  relationship?: string;
  email?: string;
  address?: string;
  age?: number;
  dob?: Date;
  bloodGroup?: string;
  genotype?: string;
}

export interface PatientType extends CreatePatientType {
  appointmentCount: number;
  medicalRecords: MedicalRecordPreviewType[];
  familyMembers: FamilyMemberType[];
  category: string;
}

export interface ApprovalInputType {
  recordId?: number[];
  patientAddress: string;
  doctorAddress: string;
  approvalType: ApprovalType;
}
export interface FamilyMemberApprovalInputType extends ApprovalInputType {
  familyMemberId: number;
}

export interface UpdatePatientProfileType {
  walletAddress: string;
  name?: string;
  lastName?: string;
  age?: string;
  email?: string;
  profilePicture?: string;
  address?: string;
  city?: string;
  bloodGroup?: string;
  genotype?: string;
}

export interface CreatePrescriptionInterface {
  doctorName: string;
  recordId: number;
  patientAddress: string;
  doctorAddress: string;
  medicineName: string;
  medicineId?: string;
  medicineGroup?: string;
  description: string;
  sideEffects: string;
  date?: Date;
}

export interface SharePrescriptionInterface {
  walletAddress: string;
  pharmacistAddress: string;
  prescriptionId: Types.ObjectId;
}

export interface UpdatePrescriptionInterface {
  medicineName?: string;
  medicineId?: string;
  medicineGroup?: string;
  description?: string;
  sideEffects?: string;
}
