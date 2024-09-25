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
import { IApprovalInput, ICreatePatient, IFamilyMember, IFamilyMemberApprovalInput, ISharePrescription, IUpdateFamilyMember, IUpdatePatientProfile } from '../interface/patient.interface';
import { Model, Types } from 'mongoose';
import { PatientDao } from '../dao/patient.dao';
import { PatientGuard } from '../guards/patient.guard';
import { PharmacistGuard } from '@/modules/pharmacist/guards/pharmacist.guard';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { OtpService } from '@/modules/otp/services/otp.service';
import { PatientErrors, PatientSuccess } from '@/modules/patient/data/patient.data';
export declare class PatientService {
    private patientModel;
    private readonly patientDao;
    private readonly patientGuard;
    private readonly pharmacistGuard;
    private readonly pharmacistDao;
    private readonly doctorDao;
    private readonly otpService;
    private readonly logger;
    private provider;
    constructor(patientModel: Model<Patient>, patientDao: PatientDao, patientGuard: PatientGuard, pharmacistGuard: PharmacistGuard, pharmacistDao: PharmacistDao, doctorDao: DoctorDao, otpService: OtpService);
    private getApprovalType;
    private createApprovalInputs;
    createNewPatient(args: ICreatePatient): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        patient?: undefined;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
        patient: import("mongoose").Document<unknown, {}, Patient> & Patient & {
            _id: Types.ObjectId;
        };
    }>;
    addFamilyMember(args: {
        walletAddress: string;
        familyMember: IFamilyMember;
    }): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    listFamilyMember(walletAddress: string): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        members: any[];
    } | {
        success: HttpStatus;
        message: PatientSuccess;
        members: import("../schemas/patient.schema").FamilyMember[];
    }>;
    getFamilyMemberById(args: {
        walletAddress: string;
        memberId: number;
    }): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        member?: undefined;
    } | {
        success: HttpStatus;
        member: import("../schemas/patient.schema").FamilyMember;
        message?: undefined;
    }>;
    editFamilyMember(args: {
        walletAddress: string;
        familyMemberId: number;
        updateData: IUpdateFamilyMember;
    }): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        familyMember?: undefined;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
        familyMember: import("mongoose").UpdateWriteOpResult;
    }>;
    findAllPatients(): Promise<{
        status: HttpStatus;
        message: PatientErrors;
        data: any[];
        patients?: undefined;
    } | {
        status: HttpStatus;
        patients: (import("mongoose").Document<unknown, {}, Patient> & Patient & {
            _id: Types.ObjectId;
        })[];
        message?: undefined;
        data?: undefined;
    }>;
    fetchPatientByWalletAddress(walletAddress: string): Promise<{
        success: HttpStatus;
        message: PatientErrors;
        patient?: undefined;
    } | {
        success: HttpStatus;
        patient: import("mongoose").Document<unknown, {}, Patient> & Patient & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    updatePatient(walletAddress: string, args: IUpdatePatientProfile): Promise<{
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    deletePatientByAddress(walletAddress: string): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    fetchAllPrescriptions(walletAddress: string): Promise<{
        success: HttpStatus;
        prescriptions: import("../schemas/patient.schema").Prescriptions[];
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
    sharePrescription(args: ISharePrescription): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removePrescriptions(walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    approveMedicalRecordAccess(args: IApprovalInput): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    approveMedicalRecordAccessForFamilyMember(args: IFamilyMemberApprovalInput): Promise<{
        success: HttpStatus;
        message: PatientErrors;
    } | {
        success: HttpStatus;
        message: PatientSuccess;
    }>;
    fetchAllMedicalRecords(patientAddress: string): Promise<{
        success: HttpStatus;
        medicalRecords: import("../schemas/patient.schema").MedicalRecordPreviewDocument[];
    }>;
    fetchAllMedicalRecordsForFamilyMember(args: {
        principalPatientAddress: string;
        familyMemberId: number;
    }): Promise<{
        success: HttpStatus;
        message: PatientErrors;
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
}
