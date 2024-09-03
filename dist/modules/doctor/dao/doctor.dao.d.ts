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
import { Model } from 'mongoose';
import { Doctor } from '../schema/doctor.schema';
import { CreateDoctorType, UpdateDoctorType } from '../interface/doctor.interface';
export declare class DoctorDao {
    private readonly doctorModel;
    constructor(doctorModel: Model<Doctor>);
    createNewDoctor(doctor: CreateDoctorType): Promise<import("mongoose").Document<unknown, {}, Doctor> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchDoctorByAddress(address: string): Promise<import("mongoose").Document<unknown, {}, Doctor> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchAllDoctors(): Promise<(import("mongoose").Document<unknown, {}, Doctor> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    fetchDoctorWithPendingStatus(): Promise<(import("mongoose").Document<unknown, {}, Doctor> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    fetchDoctorWithApprovedStatus(): Promise<(import("mongoose").Document<unknown, {}, Doctor> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deleteDoctor(address: string): Promise<import("mongodb").DeleteResult>;
    updateDoctor(address: string, updateData: UpdateDoctorType): Promise<import("mongoose").Document<unknown, {}, Doctor> & Doctor & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
