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
import { Document, HydratedDocument } from 'mongoose';
export type MedicalRecordPreviewDocument = MedicalRecordPreview & Document;
export declare class MedicalRecordPreview extends Document {
    id: number;
    principalPatient: string;
    doctorAddress: string;
    diagnosis: string;
    doctorsName: string;
    hospitalName: string;
    date: Date;
}
export declare const MedicalRecordPreviewSchema: import("mongoose").Schema<MedicalRecordPreview, import("mongoose").Model<MedicalRecordPreview, any, any, any, Document<unknown, any, MedicalRecordPreview> & MedicalRecordPreview & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MedicalRecordPreview, Document<unknown, {}, import("mongoose").FlatRecord<MedicalRecordPreview>> & import("mongoose").FlatRecord<MedicalRecordPreview> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class Prescriptions extends Document {
    doctorName: string;
    recordId: number;
    patientAddress: string;
    doctorAddress: string;
    medicineName: string;
    quantity?: number;
    medicineId?: string;
    medicineGroup?: string;
    description: string;
    sideEffects: string;
    date: Date;
    status?: string;
    dispensedDate?: Date;
    dispensedBy?: string;
}
export declare const PrescriptionsSchema: import("mongoose").Schema<Prescriptions, import("mongoose").Model<Prescriptions, any, any, any, Document<unknown, any, Prescriptions> & Prescriptions & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Prescriptions, Document<unknown, {}, import("mongoose").FlatRecord<Prescriptions>> & import("mongoose").FlatRecord<Prescriptions> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class FamilyMember extends Document {
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
    medicalRecord: MedicalRecordPreviewDocument[];
}
export declare const FamilyMemberSchema: import("mongoose").Schema<FamilyMember, import("mongoose").Model<FamilyMember, any, any, any, Document<unknown, any, FamilyMember> & FamilyMember & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FamilyMember, Document<unknown, {}, import("mongoose").FlatRecord<FamilyMember>> & import("mongoose").FlatRecord<FamilyMember> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export type PatientDocument = HydratedDocument<Patient>;
export declare class Patient {
    id: number;
    appointmentCount: number;
    name: string;
    lastName: string;
    age: number;
    email: string;
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
}
export declare const PatientSchema: import("mongoose").Schema<Patient, import("mongoose").Model<Patient, any, any, any, Document<unknown, any, Patient> & Patient & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Patient, Document<unknown, {}, import("mongoose").FlatRecord<Patient>> & import("mongoose").FlatRecord<Patient> & {
    _id: import("mongoose").Types.ObjectId;
}>;
