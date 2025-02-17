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
import { Types } from 'mongoose';
import { DoctorDao } from '../dao/doctor.dao';
import { AddPatientPrescription, ApproveMedicalRecordAccessRequestType, CreateDoctorType, CreateMedicalRecordType, UpdateDoctorType } from '../interface/doctor.interface';
import { DoctorGuard } from '../guards/doctor.guard';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { PatientDao } from '@/modules/patient/dao/patient.dao';
import { PatientGuard } from '@/modules/patient/guards/patient.guard';
import { MedicineDao } from '@/modules/medicine/dao/medicine.dao';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class DoctorService {
    private readonly doctorDao;
    private readonly doctorGuard;
    private readonly hospitalDao;
    private readonly patientDao;
    private readonly patientGuard;
    private readonly medicineDao;
    private readonly eventEmitter;
    private readonly logger;
    constructor(doctorDao: DoctorDao, doctorGuard: DoctorGuard, hospitalDao: HospitalDao, patientDao: PatientDao, patientGuard: PatientGuard, medicineDao: MedicineDao, eventEmitter: EventEmitter2);
    getPendingDoctors(): Promise<{
        success: HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    getApprovedDoctors(): Promise<{
        success: HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    createDoctor(args: CreateDoctorType): Promise<{
        success: HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: HttpStatus;
        doctor: import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    getDoctorByAddress(address: string): Promise<{
        success: HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: HttpStatus;
        doctor: {
            id: number;
            _id: Types.ObjectId;
            hospitalIds?: number[];
            name: string;
            email: string;
            profilePicture?: string;
            specialty: string;
            location: string;
            phoneNumber: string;
            walletAddress: string;
            numberOfApprovals: number;
            status: string;
            category: string;
            isVerified: boolean;
            activeApprovals: import("../schema/doctor.schema").Approval[];
            hospitalName: string;
        };
        message?: undefined;
    }>;
    getAllDoctors(): Promise<{
        success: HttpStatus;
        allDoctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        })[];
    }>;
    updateDoctor(walletAddress: string, args: UpdateDoctorType): Promise<{
        success: HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        doctor: import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: Types.ObjectId;
        };
    }>;
    deleteDoctorByAddress(address: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    private addMedication;
    createPrescription(args: AddPatientPrescription): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    approveMedicalRecordAccessRequest(args: ApproveMedicalRecordAccessRequestType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    fetchAllActiveApprovals(doctorAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        approvals?: undefined;
    } | {
        success: HttpStatus;
        approvals: import("../schema/doctor.schema").Approval[];
        message?: undefined;
    }>;
    rejectMedicalRecordAccessRequest(args: ApproveMedicalRecordAccessRequestType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    createMedicalRecord(args: CreateMedicalRecordType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    deleteAllApprovalRequests(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    swapId(walletAddress: string, id: number): Promise<{
        success: HttpStatus;
        message: string;
    }>;
}
