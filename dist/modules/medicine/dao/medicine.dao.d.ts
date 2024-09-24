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
import { Medication, MedicineCategories, Receipt } from '../schema/medicine.schema';
import { Model, Types } from 'mongoose';
import { CreateMedicineInterface, CreateReceiptInterface } from '../interface/medicine.interface';
export declare class MedicineDao {
    private readonly medicine;
    private readonly categories;
    private readonly receipt;
    constructor(medicine: Model<Medication>, categories: Model<MedicineCategories>, receipt: Model<Receipt>);
    createMedicine(args: CreateMedicineInterface): Promise<import("mongoose").Document<unknown, {}, Medication> & Medication & {
        _id: Types.ObjectId;
    }>;
    createReceipt(args: CreateReceiptInterface): Promise<import("mongoose").Document<unknown, {}, Receipt> & Receipt & {
        _id: Types.ObjectId;
    }>;
    getAllCategories(): Promise<(import("mongoose").Document<unknown, {}, MedicineCategories> & MedicineCategories & {
        _id: Types.ObjectId;
    })[]>;
    createCategories(): Promise<import("mongoose").Document<unknown, {}, MedicineCategories> & MedicineCategories & {
        _id: Types.ObjectId;
    }>;
    deleteReceipt(id: Types.ObjectId): Promise<import("mongodb").DeleteResult>;
}
