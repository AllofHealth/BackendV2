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
import { Hospital } from '../schema/hospital.schema';
import { Model, Types } from 'mongoose';
import { CreateHospitalType, UpdateHospitalProfileType } from '../interface/hospital.interface';
export declare class HospitalDao {
    private hospitalModel;
    constructor(hospitalModel: Model<Hospital>);
    createHospital(institution: CreateHospitalType): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    fetchHospitalWithBlockchainId(id: number): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    fetchHospitalByRegNo(regNo: string): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    fetchHospitalByAdminAddress(admin: string): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    fetchHospitalWithId(id: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    updateDoctorStatus(walletAddress: string, status: string): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    updatePharmacistStatus(walletAddress: string, status: string): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    fetchHospitalWithPendingStatus(): Promise<(import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    })[]>;
    fetchHospitalWithApprovedStatus(): Promise<(import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    })[]>;
    removeHospitalById(id: Types.ObjectId): Promise<import("mongodb").DeleteResult>;
    pullOneDoctor(hospitalId: Types.ObjectId, walletAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
    pullOnePharmacist(hospitalId: Types.ObjectId, walletAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
    pullManyPharmacists(hospitalIds: number[], walletAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
    pullManyDoctors(hospitalIds: number[], walletAddress: string): Promise<import("mongoose").UpdateWriteOpResult>;
    updateHospital(hospitalId: Types.ObjectId, updateData: UpdateHospitalProfileType): Promise<import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    }>;
    findManyHospital(adminAddress: string): Promise<(import("mongoose").Document<unknown, {}, Hospital> & Hospital & {
        _id: Types.ObjectId;
    })[]>;
}
