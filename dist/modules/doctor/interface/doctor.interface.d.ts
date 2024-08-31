/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
    doctorAddress: string;
    patientAddress: string;
    medicine: AddMedicineType[];
}
export interface AddMedicineType {
    productPrescribed: string;
    productCategory: string;
    productDosage: string;
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
