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
    constructor(patientService: PatientService);
    createNewPatient(createPatientType: CreatePatientDto): Promise<{
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
    updatePatient(walletAddress: string, updatePatientDto: UpdatePatientProfileDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    createFamilyMember(walletAddress: string, createFamilyMemberDto: CreateFamilyMemberDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    updateFamilyMember(walletAddress: string, familyMemberId: number, updateFamilyMemberDto: UpdateFamilyMemberDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        familyMember?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        familyMember: import("mongoose").UpdateWriteOpResult;
    }>;
    sharePrescription(walletAddress: string, pharmacistAddress: string, sharePrescriptionDto: SharePrescriptionDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    removePrescription(walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approveMedicalRecordAccess(doctorAddress: string, createApprovalDto: CreateApprovalDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approveFamilyMemberRecordAccess(doctorAddress: string, createApprovalDto: CreateFamilyMemberApprovalDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getAllPatients(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
        _id: Types.ObjectId;
    })[]>;
    getAllFamilyMembers(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        members?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        members: import("../schemas/patient.schema").FamilyMember[];
        message: string;
    }>;
    getFamilyMemberById(walletAddress: string, memberId: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        member?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        member: import("../schemas/patient.schema").FamilyMember;
        message?: undefined;
    }>;
    getPatientByAddress(walletAddress: string): Promise<{
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
    getAllPrescriptions(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        prescriptions?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        prescriptions: import("../schemas/patient.schema").Prescriptions[];
        message?: undefined;
    }>;
    getPrescription(walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        prescription?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        prescription: import("../schemas/patient.schema").Prescriptions;
        message?: undefined;
    }>;
    getAllMedicalRecords(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        medicalRecords?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        medicalRecords: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
        message?: undefined;
    }>;
    getFamilyMemberMedicalRecords(principalPatientAddress: string, familyMemberId: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        records?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        records: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
        message?: undefined;
    }>;
    getMedicalRecord(walletAddress: string, recordId: number): Promise<{
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
    deletePatient(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
