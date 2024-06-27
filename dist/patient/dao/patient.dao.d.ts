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
import { Patient, FamilyMember, Prescriptions, MedicalRecordPreview } from '../schemas/patient.schema';
import { CreateApprovalType, CreateFamilyMemberType, CreatePatientType, CreatePrescriptionInterface, MedicalRecordPreviewType, UpdateFamilyMemberType, UpdatePatientProfileType, UpdatePrescriptionInterface } from '../interface/patient.interface';
import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Approval, Doctor } from 'src/doctor/schema/doctor.schema';
export declare class PatientDao {
    private patientModel;
    private familyMemberModel;
    private prescriptionsModel;
    private readonly approvalModel;
    private readonly doctorModel;
    private readonly medicalRecordPreviewModel;
    constructor(patientModel: Model<Patient>, familyMemberModel: Model<FamilyMember>, prescriptionsModel: Model<Prescriptions>, approvalModel: Model<Approval>, doctorModel: Model<Doctor>, medicalRecordPreviewModel: Model<MedicalRecordPreview>);
    createNewPatient(patient: CreatePatientType): Promise<import("mongoose").Document<unknown, {}, Patient> & Patient & {
        _id: Types.ObjectId;
    }>;
    createFamilyMembers(familyMember: CreateFamilyMemberType): Promise<import("mongoose").Document<unknown, {}, FamilyMember> & FamilyMember & {
        _id: Types.ObjectId;
    }>;
    createPrescription(prescription: CreatePrescriptionInterface): Promise<import("mongoose").Document<unknown, {}, Prescriptions> & Prescriptions & {
        _id: Types.ObjectId;
    }>;
    createApproval(args: CreateApprovalType): Promise<import("mongoose").Document<unknown, {}, Approval> & Approval & {
        _id: Types.ObjectId;
    }>;
    createMedicalRecordPreview(args: MedicalRecordPreviewType): Promise<import("mongoose").Document<unknown, {}, MedicalRecordPreview> & MedicalRecordPreview & {
        _id: Types.ObjectId;
    }>;
    fetchPatientByAddress(walletAddress: string): Promise<import("mongoose").Document<unknown, {}, Patient> & Patient & {
        _id: Types.ObjectId;
    }>;
    fetchPatientFamilyMember(walletAddress: string, familyMemberId: number): Promise<import("mongoose").Document<unknown, {}, FamilyMember> & FamilyMember & {
        _id: Types.ObjectId;
    }>;
    fetchAllPatients(): Promise<(import("mongoose").Document<unknown, {}, Patient> & Patient & {
        _id: Types.ObjectId;
    })[]>;
    pullOnePrescription(prescriptionId: Types.ObjectId, walletAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
    pullOneApproval(doctorAddress: string, patientAddress: string, recordId: Types.ObjectId): Promise<import("mongoose").UpdateWriteOpResult>;
    pullPatientApprovals(doctorAddress: string, patientAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
    updatePatient(walletAddress: string, updateData: UpdatePatientProfileType): Promise<import("mongoose").UpdateWriteOpResult>;
    updatePatientPrescription(walletAddress: string, recordId: number, updateData: UpdatePrescriptionInterface): Promise<import("mongoose").UpdateWriteOpResult>;
    updateFamilyMember(walletAddress: string, familyMemberId: number, updateData: UpdateFamilyMemberType): Promise<import("mongoose").UpdateWriteOpResult>;
    DeletePatient(walletAddress: string): Promise<import("mongodb").DeleteResult>;
    findOneRecord(walletAddress: string, recordId: number): Promise<import("../schemas/patient.schema").MedicalRecordPreviewDocument | {
        success: HttpStatus;
        message: string;
    }>;
    findOneFamilyMemberRecord(principalPatientAddress: string, familyMemberId: number, recordId: number): Promise<import("../schemas/patient.schema").MedicalRecordPreviewDocument | {
        success: HttpStatus;
        message: string;
    }>;
}
