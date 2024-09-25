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
        message: import("../data/patient.data").PatientErrors;
        patient?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
        patient: import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        };
    }>;
    updatePatient(ip: string, walletAddress: string, updatePatientDto: UpdatePatientProfileDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
    }>;
    createFamilyMember(ip: string, walletAddress: string, createFamilyMemberDto: CreateFamilyMemberDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
    }>;
    updateFamilyMember(ip: string, walletAddress: string, familyMemberId: number, updateFamilyMemberDto: UpdateFamilyMemberDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
        familyMember?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
        familyMember: import("mongoose").UpdateWriteOpResult;
    }>;
    sharePrescription(ip: string, walletAddress: string, pharmacistAddress: string, sharePrescriptionDto: SharePrescriptionDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    removePrescription(ip: string, walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
    }>;
    approveMedicalRecordAccess(ip: string, walletAddress: string, createApprovalDto: CreateApprovalDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
    }>;
    approveFamilyMemberRecordAccess(ip: string, walletAddress: string, createApprovalDto: CreateFamilyMemberApprovalDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
    }>;
    getAllPatients(ip: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
        data: any[];
        patients?: undefined;
    } | {
        status: import("@nestjs/common").HttpStatus;
        patients: (import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        })[];
        message?: undefined;
        data?: undefined;
    }>;
    getAllFamilyMembers(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
        members: any[];
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
        members: import("../schemas/patient.schema").FamilyMember[];
    }>;
    getFamilyMemberById(ip: string, walletAddress: string, memberId: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
        member?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        member: import("../schemas/patient.schema").FamilyMember;
        message?: undefined;
    }>;
    getPatientByAddress(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
        patient?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        patient: import("mongoose").Document<unknown, {}, import("../schemas/patient.schema").Patient> & import("../schemas/patient.schema").Patient & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllPrescriptions(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        prescriptions: import("../schemas/patient.schema").Prescriptions[];
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
        message: import("../data/patient.data").PatientErrors;
        records?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        records: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
        message?: undefined;
    }>;
    getMedicalRecord(ip: string, walletAddress: string, recordId: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientErrors;
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
        message: import("../data/patient.data").PatientErrors;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: import("../data/patient.data").PatientSuccess;
    }>;
}
