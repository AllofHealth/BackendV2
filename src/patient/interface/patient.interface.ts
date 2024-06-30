import { Types } from 'mongoose';

export type RecordTag = 'patient' | 'familyMember';
export enum ApprovalType {
  READ = 'READ',
  FULL = 'FULL',
}
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
  principalPatientAddress: string;
  doctorAddress: string;
  diagnosis: string;
  doctorsName: string;
  hospitalName: string;
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

export interface CreateApprovalType {
  patientId: number;
  patientName: string;
  recordId?: number;
  profilePicture: string;
  approvalType: string;
  approvalStatus?: string;
  approvalDuration: Date;
  recordOwner?: string;
  recordTag?: RecordTag;
}

export interface CreateApprovalInputType {
  id: number;
  name: string;
  recordIds?: number[];
  profilePicture: string;
  approvalType: string;
  approvalDuration: Date;
  recordOwner?: string;
  recordTag?: RecordTag;
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
  approvalType: string;
  approvalDurationInSecs: number;
  recordTag?: string;
}

export interface FamilyMemberApprovalInputType extends ApprovalInputType {
  familyMemberId: number;
}
export interface FamilyMemberApprovalInputType extends ApprovalInputType {
  familyMemberId: number;
}

export interface UpdatePatientProfileType {
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
  patientName: string;
  patientAddress: string;
  doctorAddress: string;
  institutionName: string;
  medicineName: string;
  quantity?: number;
  medicineId?: string;
  medicineGroup?: string;
  description: string;
  sideEffects: string;
  date?: Date;
  status?: string;
  dispensedDate?: Date;
  dispensedBy?: string;
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
