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
import { Hospital } from '../schema/hospital.schema';
import { Model, Types } from 'mongoose';
import { HospitalGuard } from '../guard/hospital.guard';
import { ApprovePractitionerType, CreateHospitalType, HospitalType, JoinHospitalType, PreviewType, RemovePractitionerType, UpdateHospitalProfileType } from '../interface/hospital.interface';
import { ErrorCodes } from 'src/shared';
import { HospitalDao } from '../dao/hospital.dao';
import { DoctorDao } from 'src/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from 'src/modules/pharmacist/dao/pharmacist.dao';
import { DoctorGuard } from 'src/modules/doctor/guards/doctor.guard';
import { PharmacistGuard } from 'src/modules/pharmacist/guards/pharmacist.guard';
export declare class HospitalService {
    private hospitalModel;
    private readonly hospitalDao;
    private readonly hospitalGuard;
    private readonly doctorDao;
    private readonly pharmacistDao;
    private readonly doctorGuard;
    private readonly pharmacistGuard;
    private logger;
    constructor(hospitalModel: Model<Hospital>, hospitalDao: HospitalDao, hospitalGuard: HospitalGuard, doctorDao: DoctorDao, pharmacistDao: PharmacistDao, doctorGuard: DoctorGuard, pharmacistGuard: PharmacistGuard);
    createNewHospital(args: CreateHospitalType): Promise<{
        success: HttpStatus;
        message: string;
        hospital?: undefined;
    } | {
        success: ErrorCodes;
        hospital: import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    removeDoctorFromHospital(hospitalId: Types.ObjectId, doctorAddress: string): Promise<void>;
    removeHospitalIdFromDoctorDocument(args: {
        hospitalId: Types.ObjectId;
        doctorAddress: string;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removeHospitalIdFromPharmacistDocument(args: {
        hospitalId: Types.ObjectId;
        pharmacistAddress: string;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removeHospitalIdFromPractitionerDocument(args: {
        hospitalId: Types.ObjectId;
        practitionerAddress: string;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removePharmacistFromHospital(hospitalId: Types.ObjectId, pharmacistAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
    delegateAdminPosition(newAdminAddress: string, adminAddress: string, hospitalId: Types.ObjectId): Promise<{
        success: number;
        message: string;
    }>;
    updateHospitalProfile(hospitalId: Types.ObjectId, adminAddress: string, updateData: UpdateHospitalProfileType): Promise<{
        success: HttpStatus;
        message: string;
        updatedHospital?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        updatedHospital: import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
            _id: Types.ObjectId;
        };
    }>;
    joinHospital(args: JoinHospitalType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removePractitionerFromHospital(adminAddress: string, args: RemovePractitionerType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    approvePractitioner(hospitalAdmin: string, args: ApprovePractitionerType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    fetchApprovedHospitals(): Promise<{
        success: number;
        hospitals: (import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
            _id: Types.ObjectId;
        })[];
    }>;
    fetchPendingHospitals(): Promise<{
        success: number;
        hospitals: (import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
            _id: Types.ObjectId;
        })[];
    }>;
    fetchAllHospitals(): Promise<{
        success: ErrorCodes;
        hospitals: (import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
            _id: Types.ObjectId;
        })[];
    }>;
    fetchHospitalById(id: Types.ObjectId): Promise<{
        success: ErrorCodes;
        message: string;
        hospital?: undefined;
    } | {
        success: ErrorCodes;
        hospital: import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    fetchPendingDoctors(hospitalId: Types.ObjectId): Promise<{
        success: ErrorCodes;
        doctors: PreviewType[];
        message: string;
    }>;
    fetchPendingPharmacists(hospitalId: Types.ObjectId): Promise<{
        success: ErrorCodes;
        pharmacists: PreviewType[];
        message: string;
    }>;
    fetchApprovedDoctors(hospitalId: Types.ObjectId): Promise<{
        success: ErrorCodes;
        doctors: PreviewType[];
        message: string;
    }>;
    fetchApprovedPharmacists(hospitalId: Types.ObjectId): Promise<{
        success: ErrorCodes;
        pharmacists: PreviewType[];
        message: string;
    }>;
    fetchAllDoctors(hospitalId: Types.ObjectId): Promise<{
        success: ErrorCodes;
        doctors: PreviewType[];
    }>;
    fetchAllPharmacists(hospitalId: Types.ObjectId): Promise<{
        success: ErrorCodes;
        pharmacists: PreviewType[];
    }>;
    fetchHospitalPractitioners(hospitalId: Types.ObjectId): Promise<{
        success: HttpStatus;
        practitioners: PreviewType[];
    }>;
    returnDoctorFromHospital(hospital: HospitalType, walletAddress: string): Promise<PreviewType | undefined>;
    returnPharmacistFromHospital(hospital: HospitalType, walletAddress: string): Promise<PreviewType | undefined>;
    private validatePractitioner;
    fetchPractitionerCreatedHospital(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        hospitals?: undefined;
    } | {
        success: HttpStatus;
        hospitals: (import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
            _id: Types.ObjectId;
        })[];
        message?: undefined;
    }>;
}
