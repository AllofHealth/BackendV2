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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus } from '@nestjs/common';
import { DoctorDao } from '../dao/doctor.dao';
import { AddPatientPrescription, ApproveMedicalRecordAccessRequestType, CreateDoctorType, CreateMedicalRecordType, UpdateDoctorType } from '../interface/doctor.interface';
import { DoctorGuard } from '../guards/doctor.guard';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { PatientDao } from 'src/patient/dao/patient.dao';
import { PatientGuard } from 'src/patient/guards/patient.guard';
export declare class DoctorService {
    private readonly doctorDao;
    private readonly doctorGuard;
    private readonly hospitalDao;
    private readonly patientDao;
    private readonly patientGuard;
    constructor(doctorDao: DoctorDao, doctorGuard: DoctorGuard, hospitalDao: HospitalDao, patientDao: PatientDao, patientGuard: PatientGuard);
    getPendingDoctors(): Promise<{
        success: HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getApprovedDoctors(): Promise<{
        success: HttpStatus;
        doctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    createDoctor(args: CreateDoctorType): Promise<{
        success: HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: HttpStatus;
        doctor: import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    getDoctorByAddress(address: string): Promise<{
        success: HttpStatus;
        message: string;
        doctor?: undefined;
    } | {
        success: HttpStatus;
        doctor: import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: import("mongoose").Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllDoctors(): Promise<{
        success: HttpStatus;
        allDoctors: (import("mongoose").Document<unknown, {}, import("../schema/doctor.schema").Doctor> & import("../schema/doctor.schema").Doctor & {
            _id: import("mongoose").Types.ObjectId;
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
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteDoctorByAddress(address: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
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
}
