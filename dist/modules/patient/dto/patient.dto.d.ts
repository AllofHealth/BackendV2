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
import { MedicineDto } from '@/modules/medicine/dto/medicine.dto';
import { TApprovalType } from '@/modules/patient/interface/patient.interface';
export declare class MedicalRecordDto {
    id: number;
    principalPatient: string;
    doctorAddress: string;
    diagnosis: string;
    doctorsName: string;
    hospitalName: string;
    date: Date;
    _id: Types.ObjectId;
}
export declare class ReceiptDto {
    productDispensed: string;
    dateDispensed: Date;
    directions: string;
    quantity: string;
    price: string;
}
export declare class PrescriptionDto {
    recordId: number;
    doctorName: string;
    doctorAddress: string;
    institutionName: string;
    patientName: string;
    patientAddress: string;
    medicine: MedicineDto[];
    date: Date;
    status: string;
    _id: Types.ObjectId;
}
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
export declare class FamilyMemberDto {
    id: number;
    principalPatient: string;
    name: string;
    relationship: string;
    email: string;
    address: string;
    age: number;
    dob: Date;
    bloodGroup: string;
    genotype: string;
    medicalRecord: MedicalRecordDto[];
    _id: Types.ObjectId;
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
    medicalRecords: MedicalRecordDto[];
    prescriptions: PrescriptionDto[];
    familyMembers: FamilyMemberDto[];
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
    approvalType: TApprovalType;
    approvalDurationInSec: number;
}
export declare class CreateFamilyMemberApprovalDto {
    familyMemberId: number;
    recordId?: number[];
    doctorAddress: string;
    approvalType: TApprovalType;
    approvalDurationInSec: number;
}
