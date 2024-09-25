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
import { PatientService } from '../services/patient.service';
import { CreateApprovalDto, CreateFamilyMemberApprovalDto, CreateFamilyMemberDto, CreatePatientDto, SharePrescriptionDto, UpdateFamilyMemberDto, UpdatePatientProfileDto } from '../dto/patient.dto';
import { Types } from 'mongoose';
import { PatientErrors, PatientSuccess } from '@/modules/patient/data/patient.data';
export declare class PatientController {
    private readonly patientService;
    private readonly logger;
    constructor(patientService: PatientService);
    createNewPatient(ip: string, createPatientType: CreatePatientDto): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        patient?: undefined;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
        patient: import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        };
    }>;
    updatePatient(ip: string, walletAddress: string, updatePatientDto: UpdatePatientProfileDto): Promise<{
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    createFamilyMember(ip: string, walletAddress: string, createFamilyMemberDto: CreateFamilyMemberDto): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    updateFamilyMember(ip: string, walletAddress: string, familyMemberId: number, updateFamilyMemberDto: UpdateFamilyMemberDto): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        familyMember?: undefined;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
        familyMember: import("mongoose").UpdateWriteOpResult;
    }>;
    sharePrescription(ip: string, walletAddress: string, pharmacistAddress: string, sharePrescriptionDto: SharePrescriptionDto): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removePrescription(ip: string, walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    approveMedicalRecordAccess(ip: string, walletAddress: string, createApprovalDto: CreateApprovalDto): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    approveFamilyMemberRecordAccess(ip: string, walletAddress: string, createApprovalDto: CreateFamilyMemberApprovalDto): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    getAllPatients(ip: string): Promise<{
        status: HttpStatus;
        message: PatientErrors;
        data: any[];
        patients?: undefined;
    } | {
        status: HttpStatus;
        patients: (import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        })[];
        message?: undefined;
        data?: undefined;
    }>;
    getAllFamilyMembers(ip: string, walletAddress: string): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        members: any[];
    } | {
        success: HttpStatus;
        message: PatientSuccess;
        members: import("../schemas/patient.schema").FamilyMember[];
    }>;
    getFamilyMemberById(ip: string, walletAddress: string, memberId: number): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        member?: undefined;
    } | {
        success: HttpStatus;
        member: import("../schemas/patient.schema").FamilyMember;
        message?: undefined;
    }>;
    getPatientByAddress(ip: string, walletAddress: string): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        patient?: undefined;
    } | {
        success: HttpStatus;
        patient: import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllPrescriptions(ip: string, walletAddress: string): Promise<{
        success: HttpStatus;
        prescriptions: import("../schemas/patient.schema").Prescriptions[];
    }>;
    getPrescription(ip: string, walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
        prescription?: undefined;
    } | {
        success: HttpStatus;
        prescription: import("../schemas/patient.schema").Prescriptions;
        message?: undefined;
    }>;
    getAllMedicalRecords(ip: string, walletAddress: string): Promise<{
        success: HttpStatus;
        medicalRecords: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
    }>;
    getFamilyMemberMedicalRecords(ip: string, principalPatientAddress: string, familyMemberId: number): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        records?: undefined;
    } | {
        success: HttpStatus;
        records: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
        message?: undefined;
    }>;
    getMedicalRecord(ip: string, walletAddress: string, recordId: number): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        record?: undefined;
    } | {
        success: HttpStatus;
        record: import("../schemas/patient.schema").MedicalRecordPreviewDocument | {
            success: HttpStatus;
            message: string;
        };
        message?: undefined;
    }>;
    deletePatient(ip: string, walletAddress: string): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
}
