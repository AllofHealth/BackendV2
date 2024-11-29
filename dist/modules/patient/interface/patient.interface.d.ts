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
export type RecordTag = 'patient' | 'familyMember';
export type TApprovalType = 'view' | 'modify' | 'view & modify';
export type RelationShipType = 'father' | 'mother' | 'brother' | 'sister' | 'aunt' | 'uncle' | 'cousin' | 'nephew' | 'niece' | 'grandfather' | 'grandmother' | 'grandson' | 'granddaughter' | 'son' | 'daughter' | 'wife' | 'husband' | 'friend' | 'other';
export interface IMedicalRecordPreview {
    recordId: number;
    principalPatientAddress: string;
    doctorAddress: string;
    diagnosis: string;
    doctorsName: string;
    hospitalName: string;
}
export interface IFamilyMember {
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
    medicalRecord?: IMedicalRecordPreview[];
}
export interface ICreateFamilyMember {
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
    medicalRecord?: IMedicalRecordPreview[];
}
export interface ICreatePatient {
    id: number;
    name: string;
    lastName?: string;
    age: number;
    email: string;
    phoneNo: string;
    profilePicture?: string;
    address: string;
    city: string;
    bloodGroup: string;
    genotype: string;
    walletAddress: string;
    category?: string;
}
export interface ICreateApproval {
    patientId: number;
    patientName: string;
    recordId?: number;
    profilePicture: string;
    approvalType: TApprovalType;
    approvalStatus?: string;
    approvalDuration: Date;
    recordOwner?: string;
    recordTag?: RecordTag;
}
export interface ICreateApprovalInput {
    id: number;
    name: string;
    recordIds?: number[];
    profilePicture: string;
    approvalType: TApprovalType;
    approvalDuration: Date;
    recordOwner?: string;
    recordTag?: RecordTag;
}
export interface IUpdateFamilyMember {
    name?: string;
    relationship?: string;
    email?: string;
    address?: string;
    age?: number;
    dob?: Date;
    bloodGroup?: string;
    genotype?: string;
}
export interface IPatient extends ICreatePatient {
    appointmentCount: number;
    medicalRecords: IMedicalRecordPreview[];
    familyMembers: IFamilyMember[];
    category: string;
}
export interface IApprovalInput {
    recordId?: number[];
    patientAddress: string;
    doctorAddress: string;
    approvalType: TApprovalType;
    approvalDurationInSecs: number;
    recordTag?: string;
}
export interface IFamilyMemberApprovalInput extends IApprovalInput {
    familyMemberId: number;
}
export interface IUpdatePatientProfile {
    name?: string;
    lastName?: string;
    age?: string;
    email?: string;
    phoneNo?: string;
    profilePicture?: string;
    address?: string;
    city?: string;
    bloodGroup?: string;
    genotype?: string;
}
export interface ICreatePrescription {
    recordId: number;
    doctorName: string;
    doctorAddress: string;
    institutionName: string;
    patientName: string;
    patientAddress: string;
    medicine: IAddMedicine[];
}
export interface IAddMedicine {
    productPrescribed: string;
    productCategory: string;
    practitionerNote: string;
}
export interface ISharePrescription {
    walletAddress: string;
    pharmacistAddress: string;
    prescriptionId: Types.ObjectId;
}
export interface IUpdatePrescription {
    medicineName?: string;
    medicineId?: string;
    medicineGroup?: string;
    description?: string;
    sideEffects?: string;
}
export interface IFamilyMemberRecord {
    principalPatientAddress: string;
    familyMemberId: number;
    recordId: number;
}
