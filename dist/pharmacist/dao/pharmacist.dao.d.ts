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
import { Inventory, Medicine, Pharmacist } from '../schema/pharmacist.schema';
import { Model, Types } from 'mongoose';
import { CreatePharmacistType, InventoryType, MedicineType, UpdateMedicineType, UpdatePharmacistType } from '../interface/pharmacist.interface';
export declare class PharmacistDao {
    private readonly pharmacistModel;
    private readonly medicineModel;
    private readonly inventoryModel;
    constructor(pharmacistModel: Model<Pharmacist>, medicineModel: Model<Medicine>, inventoryModel: Model<Inventory>);
    createNewPharmacist(pharmacist: CreatePharmacistType): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: Types.ObjectId;
    }>;
    createMedicine(args: MedicineType): Promise<import("mongoose").Document<unknown, {}, Medicine> & Medicine & {
        _id: Types.ObjectId;
    }>;
    createInventory(args: InventoryType): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & {
        _id: Types.ObjectId;
    }>;
    fetchPharmacist(id: number): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: Types.ObjectId;
    }>;
    fetchPharmacistByAddress(address: string): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: Types.ObjectId;
    }>;
    fetchAllPharmacists(): Promise<(import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: Types.ObjectId;
    })[]>;
    fetchPharmacistWithPendingStatus(): Promise<(import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: Types.ObjectId;
    })[]>;
    fetchPharmacistsWithApprovedStatus(): Promise<(import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: Types.ObjectId;
    })[]>;
    updatePharmacist(address: string, updateData: UpdatePharmacistType): Promise<import("mongoose").Document<unknown, {}, Pharmacist> & Pharmacist & {
        _id: Types.ObjectId;
    }>;
    updateMedicine(medicineId: Types.ObjectId, updateData: UpdateMedicineType): Promise<import("mongoose").Document<unknown, {}, Medicine> & Medicine & {
        _id: Types.ObjectId;
    }>;
    deleteMedicine(medicineId: Types.ObjectId): Promise<import("mongodb").DeleteResult>;
    deletePharmacist(address: string): Promise<import("mongodb").DeleteResult>;
}
