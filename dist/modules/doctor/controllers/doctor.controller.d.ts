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
    private readonly logger;
    constructor(doctorService: DoctorService);
    createDoctor(ip: string, createDoctorDto: CreateDoctorDto): Promise<{
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
    updateDoctor(ip: string, walletAddress: string, updateDoctorDto: UpdateDoctorDto): Promise<{
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
    addPatientPrescription(ip: string, doctorAddress: string, patientAddress: string, prescriptionDto: CreatePrescriptionDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approveRecordAccessRequest(ip: string, doctorAddress: string, patientAddress: string, recordId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    rejectRecordAccessRequest(ip: string, doctorAddress: string, patientAddress: string, recordId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    createMedicalRecordPreview(ip: string, doctorAddress: string, patientAddress: string, createMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    swapId(walletAddress: string, id: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    deleteAllApprovalRequests(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getDoctorByAddress(ip: string, walletAddress: string): Promise<{
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
    getAllDoctors(ip: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        allDoctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    getApprovedDoctors(ip: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    getPendingDoctors(ip: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    getActiveApprovals(ip: string, doctorAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        approvals?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        approvals: import("../schema/doctor.schema").Approval[];
        message?: undefined;
    }>;
    deleteDoctorByAddress(ip: string, walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
