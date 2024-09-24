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
import { PatientService } from '../services/patient.service';
import { CreateApprovalDto, CreateFamilyMemberApprovalDto, CreateFamilyMemberDto, CreatePatientDto, SharePrescriptionDto, UpdateFamilyMemberDto, UpdatePatientProfileDto } from '../dto/patient.dto';
import { Types } from 'mongoose';
export declare class PatientController {
    private readonly patientService;
    private readonly logger;
    constructor(patientService: PatientService);
    createNewPatient(ip: string, createPatientType: CreatePatientDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        patient?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        patient: import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    updatePatient(ip: string, walletAddress: string, updatePatientDto: UpdatePatientProfileDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    createFamilyMember(ip: string, walletAddress: string, createFamilyMemberDto: CreateFamilyMemberDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    updateFamilyMember(ip: string, walletAddress: string, familyMemberId: number, updateFamilyMemberDto: UpdateFamilyMemberDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        familyMember?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        familyMember: import("mongoose").UpdateWriteOpResult;
    }>;
    sharePrescription(ip: string, walletAddress: string, pharmacistAddress: string, sharePrescriptionDto: SharePrescriptionDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    removePrescription(ip: string, walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approveMedicalRecordAccess(ip: string, walletAddress: string, createApprovalDto: CreateApprovalDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approveFamilyMemberRecordAccess(ip: string, walletAddress: string, createApprovalDto: CreateFamilyMemberApprovalDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getAllPatients(ip: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
        _id: Types.ObjectId;
    })[]>;
    getAllFamilyMembers(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        members: import("../schemas/patient.schema").FamilyMember[];
        message: string;
    }>;
    getFamilyMemberById(ip: string, walletAddress: string, memberId: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        member?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        member: import("../schemas/patient.schema").FamilyMember;
        message?: undefined;
    }>;
    getPatientByAddress(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        patient?: undefined;
    } | {
        success: import("../../../shared").ErrorCodes;
        patient: import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllPrescriptions(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        prescriptions?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        prescriptions: import("../schemas/patient.schema").Prescriptions[];
        message?: undefined;
    }>;
    getPrescription(ip: string, walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        prescription?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        prescription: import("../schemas/patient.schema").Prescriptions;
        message?: undefined;
    }>;
    getAllMedicalRecords(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        medicalRecords: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
    }>;
    getFamilyMemberMedicalRecords(ip: string, principalPatientAddress: string, familyMemberId: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        records?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        records: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
        message?: undefined;
    }>;
    getMedicalRecord(ip: string, walletAddress: string, recordId: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        record?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        record: import("../schemas/patient.schema").MedicalRecordPreviewDocument | {
            success: import("@nestjs/common").HttpStatus;
            message: string;
        };
        message?: undefined;
    }>;
    deletePatient(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
