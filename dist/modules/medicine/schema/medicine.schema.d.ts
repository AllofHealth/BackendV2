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
import { Document } from 'mongoose';
export declare class Receipt extends Document {
    productDispensed: string;
    dateDispensed: Date;
    directions: string;
    quantity: string;
    price: string;
}
export declare const ReceiptSchema: import("mongoose").Schema<Receipt, import("mongoose").Model<Receipt, any, any, any, Document<unknown, any, Receipt> & Receipt & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Receipt, Document<unknown, {}, import("mongoose").FlatRecord<Receipt>> & import("mongoose").FlatRecord<Receipt> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class Medication extends Document {
    productPrescribed: string;
    productCategory: string;
    productDosage: string;
    practitionerNote: string;
    date: Date;
    isDispensed: boolean;
    receipt: Receipt;
}
export declare const MedicineSchema: import("mongoose").Schema<Medication, import("mongoose").Model<Medication, any, any, any, Document<unknown, any, Medication> & Medication & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Medication, Document<unknown, {}, import("mongoose").FlatRecord<Medication>> & import("mongoose").FlatRecord<Medication> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class MedicineCategories {
    category?: string[];
}
export declare const MedicineCategoriesSchema: import("mongoose").Schema<MedicineCategories, import("mongoose").Model<MedicineCategories, any, any, any, Document<unknown, any, MedicineCategories> & MedicineCategories & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MedicineCategories, Document<unknown, {}, import("mongoose").FlatRecord<MedicineCategories>> & import("mongoose").FlatRecord<MedicineCategories> & {
    _id: import("mongoose").Types.ObjectId;
}>;
