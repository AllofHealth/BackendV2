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
import { HttpStatus } from '@nestjs/common';
import { Patient } from '../schemas/patient.schema';
import { ApprovalInputType, CreatePatientType, FamilyMemberApprovalInputType, FamilyMemberType, SharePrescriptionInterface, UpdateFamilyMemberType, UpdatePatientProfileType } from '../interface/patient.interface';
import { Model, Types } from 'mongoose';
import { PatientDao } from '../dao/patient.dao';
import { PatientGuard } from '../guards/patient.guard';
import { PharmacistGuard } from '@/modules/pharmacist/guards/pharmacist.guard';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { OtpService } from '@/modules/otp/services/otp.service';
import { ErrorCodes } from '@/shared';
export declare class PatientService {
    private patientModel;
    private readonly patientDao;
    private readonly patientGuard;
    private readonly pharmacistGuard;
    private readonly pharmacistDao;
    private readonly doctorDao;
    private readonly otpService;
    constructor(patientModel: Model<Patient>, patientDao: PatientDao, patientGuard: PatientGuard, pharmacistGuard: PharmacistGuard, pharmacistDao: PharmacistDao, doctorDao: DoctorDao, otpService: OtpService);
    private provider;
    private getApprovalType;
    private createApprovalInputs;
    createNewPatient(args: CreatePatientType): Promise<{
        success: HttpStatus;
        message: string;
        patient?: undefined;
    } | {
        success: HttpStatus;
        patient: import("mongoose").Document<unknown, {}, Patient> & Patient & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    addFamilyMember(args: {
        walletAddress: string;
        familyMember: FamilyMemberType;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    listFamilyMember(walletAddress: string): Promise<{
        success: HttpStatus;
        members: import("../schemas/patient.schema").FamilyMember[];
        message: string;
    }>;
    getFamilyMemberById(args: {
        walletAddress: string;
        memberId: number;
    }): Promise<{
        success: HttpStatus;
        message: string;
        member?: undefined;
    } | {
        success: HttpStatus;
        member: import("../schemas/patient.schema").FamilyMember;
        message?: undefined;
    }>;
    editFamilyMember(args: {
        walletAddress: string;
        familyMemberId: number;
        updateData: UpdateFamilyMemberType;
    }): Promise<{
        success: HttpStatus;
        message: string;
        familyMember?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        familyMember: import("mongoose").UpdateWriteOpResult;
    }>;
    findAllPatients(): Promise<(import("mongoose").Document<unknown, {}, Patient> & Patient & {
        _id: Types.ObjectId;
    })[]>;
    fetchPatientByWalletAddress(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        patient?: undefined;
    } | {
        success: ErrorCodes;
        patient: import("mongoose").Document<unknown, {}, Patient> & Patient & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    updatePatient(walletAddress: string, args: UpdatePatientProfileType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    deletePatientByAddress(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    fetchAllPrescriptions(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        prescriptions?: undefined;
    } | {
        success: HttpStatus;
        prescriptions: import("../schemas/patient.schema").Prescriptions[];
        message?: undefined;
    }>;
    fetchPrescription(walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
        prescription?: undefined;
    } | {
        success: HttpStatus;
        prescription: import("../schemas/patient.schema").Prescriptions;
        message?: undefined;
    }>;
    sharePrescription(args: SharePrescriptionInterface): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removePrescriptions(walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    approveMedicalRecordAccess(args: ApprovalInputType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    approveMedicalRecordAccessForFamilyMember(args: FamilyMemberApprovalInputType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    fetchAllMedicalRecords(patientAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        medicalRecords?: undefined;
    } | {
        success: HttpStatus;
        medicalRecords: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
        message?: undefined;
    }>;
    fetchAllMedicalRecordsForFamilyMember(args: {
        principalPatientAddress: string;
        familyMemberId: number;
    }): Promise<{
        success: HttpStatus;
        message: string;
        records?: undefined;
    } | {
        success: HttpStatus;
        records: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
        message?: undefined;
    }>;
    fetchMedicalRecordById(args: {
        walletAddress: string;
        recordId: number;
    }): Promise<{
        success: HttpStatus;
        message: string;
        record?: undefined;
    } | {
        success: HttpStatus;
        record: import("../schemas/patient.schema").MedicalRecordPreviewDocument | {
            success: HttpStatus;
            message: string;
        };
        message?: undefined;
    }>;
}
