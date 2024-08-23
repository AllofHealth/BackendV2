import { Types } from 'mongoose';

export type ApprovalType = 'view' | 'full';
export type RecordOwnerType = 'principal' | 'family member';

export interface ActiveApprovalType {
  patientId: number;
  patientName: string;
  recordId?: number;
  profilePicture?: string;
  patientAddress: string;
  approvalType: ApprovalType;
  approvalStatus?: string;
  approvalTime?: Date;
  recordOwner?: RecordOwnerType;
}

export interface CreateDoctorType {
  id: number;
  hospitalIds?: number;
  name: string;
  email: string;
  profilePicture?: string;
  specialty: string;
  location: string;
  phoneNumber: string;
  walletAddress: string;
  status?: string;
}

export interface UpdateDoctorType {
  name?: string;
  email?: string;
  about?: string;
  profilePicture?: string;
  specialty?: string;
  location?: string;
  phoneNumber?: string;
}

export interface DoctorType {
  id: number;
  _id: Types.ObjectId;
  hospitalIds?: number[];
  name: string;
  email: string;
  profilePicture?: string;
  specialty: string;
  location: string;
  phoneNumber: string;
  walletAddress: string;
  numberOfApprovals: number;
  activeApprovals: ActiveApprovalType[];
  status: string;
  category: string;
}

export interface AddPatientPrescription {
  recordId: number;
  doctorName: string;
  doctorAddress: string;
  institutionName: string;
  patientName: string;
  patientAddress: string;
  medicine: AddMedicineType[];
}

export interface AddMedicineType {
  productPrescribed: string;
  productCategory: string;
  practitionerNote: string;
}

export interface ApproveMedicalRecordAccessRequestType {
  patientAddress: string;
  doctorAddress: string;
  id: Types.ObjectId;
}

export interface CreateMedicalRecordType {
  recordId: number;
  principalPatientAddress: string;
  doctorAddress: string;
  diagnosis: string;
}
