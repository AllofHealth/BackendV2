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
import { FamilyMember, MedicalRecordPreviewDocument, Prescriptions } from '@/modules/patient/schemas/patient.schema';
export declare class CreatePatientDto {
    id: number;
    name: string;
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
export declare class PatientDto {
    id: number;
    appointmentCount: number;
    name: string;
    lastName: string;
    age: number;
    email: string;
    phoneNo: string;
    profilePicture: string;
    address: string;
    city: string;
    walletAddress: string;
    bloodGroup: string;
    genotype: string;
    medicalRecords: MedicalRecordPreviewDocument[];
    prescriptions: Prescriptions[];
    familyMembers: FamilyMember[];
    category: string;
    isVerified: boolean;
    _id: Types.ObjectId;
}
export declare class UpdatePatientProfileDto {
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
export declare class CreateFamilyMemberDto {
    id: number;
    name: string;
    profilePicture?: string;
    relationship: string;
    email: string;
    address: string;
    age: number;
    dob: string;
    bloodGroup: string;
    genotype: string;
}
export declare class UpdateFamilyMemberDto {
    name?: string;
    profilePicture?: string;
    relationship?: string;
    email?: string;
    address?: string;
    age?: number;
    dob?: Date;
    bloodGroup?: string;
    genotype?: string;
}
export declare class SharePrescriptionDto {
    prescriptionId: Types.ObjectId;
}
export declare class CreateApprovalDto {
    recordId?: number[];
    doctorAddress: string;
    approvalType: string;
    approvalDurationInSec: number;
}
export declare class CreateFamilyMemberApprovalDto {
    familyMemberId: number;
    recordId?: number[];
    doctorAddress: string;
    approvalType: string;
    approvalDurationInSec: number;
}
