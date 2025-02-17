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
import { Otp } from '../schema/otp.schema';
import { Model } from 'mongoose';
import { PatientDao } from '@/modules/patient/dao/patient.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { RoleType } from '../interface/otp.interface';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { AdminDao } from '@/modules/admin/dao/admin.dao';
export declare class OtpDao {
    private otpModel;
    private readonly patientDao;
    private readonly doctorDao;
    private readonly pharmacistDao;
    private readonly hospitalDao;
    private readonly adminDao;
    constructor(otpModel: Model<Otp>, patientDao: PatientDao, doctorDao: DoctorDao, pharmacistDao: PharmacistDao, hospitalDao: HospitalDao, adminDao: AdminDao);
    createOtp(walletAddress: string, otp: string, expirationTime: Date, role: RoleType): Promise<import("mongoose").Document<unknown, {}, Otp> & Otp & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteOtp(walletAddress: string): Promise<import("mongodb").DeleteResult>;
    findOtp(walletAddress: string): Promise<import("mongoose").Document<unknown, {}, Otp> & Otp & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchPatient(walletAddress: string): Promise<import("mongoose").Document<unknown, {}, import("../../patient/schemas/patient.schema").Patient> & import("../../patient/schemas/patient.schema").Patient & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchDoctor(walletAddress: string): Promise<import("mongoose").Document<unknown, {}, import("../../doctor/schema/doctor.schema").Doctor> & import("../../doctor/schema/doctor.schema").Doctor & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchPharmacist(walletAddress: string): Promise<import("mongoose").Document<unknown, {}, import("../../pharmacist/schema/pharmacist.schema").Pharmacist> & import("../../pharmacist/schema/pharmacist.schema").Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchInstitution(walletAddress: string): Promise<import("mongoose").Document<unknown, {}, import("../../hospital/schema/hospital.schema").Hospital> & import("../../hospital/schema/hospital.schema").Hospital & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchAdmin(walletAddress: string): Promise<import("mongoose").Document<unknown, {}, import("../../admin/schema/admin.schema").Admin> & import("../../admin/schema/admin.schema").Admin & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
