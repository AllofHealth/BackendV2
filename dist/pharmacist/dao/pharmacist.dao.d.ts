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
import { Pharmacist } from '../schema/pharmacist.schema';
import { Model } from 'mongoose';
import { CreatePharmacistType, UpdatePharmacistType } from '../interface/pharmacist.interface';
export declare class PharmacistDao {
    private readonly pharmacistModel;
    constructor(pharmacistModel: Model<Pharmacist>);
    createNewPharmacist(pharmacist: CreatePharmacistType): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchPharmacist(id: number): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchPharmacistByAddress(address: string): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    fetchAllPharmacists(): Promise<(import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    fetchPharmacistWithPendingStatus(): Promise<(import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    fetchPharmacistsWithApprovedStatus(): Promise<(import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updatePharmacist(address: string, updateData: UpdatePharmacistType): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePharmacist(address: string): Promise<import("mongodb").DeleteResult>;
}
