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
import { DoctorService } from '../services/doctor.service';
import { CreateDoctorDto, CreateMedicalRecordDto, CreatePrescriptionDto, UpdateDoctorDto } from '../dto/doctor.dto';
import { Types } from 'mongoose';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    createDoctor(createDoctorDto: CreateDoctorDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        doctor: import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    updateDoctor(walletAddress: string, updateDoctorDto: UpdateDoctorDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        doctor: import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        };
    }>;
    addPatientPrescription(patientAddress: string, doctorAddress: string, prescriptionDto: CreatePrescriptionDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approveRecordAccessRequest(patientAddress: string, doctorAddress: string, recordId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    rejectRecordAccessRequest(patientAddress: string, doctorAddress: string, recordId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    createMedicalRecordPreview(patientAddress: string, doctorAddress: string, createMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    deleteAllApprovalRequests(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getDoctorByAddress(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        doctor: import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllDoctors(): Promise<{
        success: import("@nestjs/common").HttpStatus;
        allDoctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    getApprovedDoctors(): Promise<{
        success: import("@nestjs/common").HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    getPendingDoctors(): Promise<{
        success: import("@nestjs/common").HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    getActiveApprovals(doctorAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        approvals?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        approvals: import("../schema/doctor.schema").Approval[];
        message?: undefined;
    }>;
    deleteDoctorByAddress(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
