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
import { HydratedDocument } from 'mongoose';
import { Prescriptions } from 'src/modules/patient/schemas/patient.schema';
export declare class ApprovalList {
    patientId: number;
    name: string;
    recordId: number;
    profilePicture?: string;
    patientAddress: string;
    doctorAddress: string;
    approvalType: string;
    recordOwner: string;
}
export declare const ApprovalListSchema: import("mongoose").Schema<ApprovalList, import("mongoose").Model<ApprovalList, any, any, any, import("mongoose").Document<unknown, any, ApprovalList> & ApprovalList & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ApprovalList, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ApprovalList>> & import("mongoose").FlatRecord<ApprovalList> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class Medicine {
    name: string;
    price: number;
    quantity: number;
    description: string;
    sideEffects?: string;
    image?: string;
    medicineGroup: string;
}
export declare const MedicineSchema: import("mongoose").Schema<Medicine, import("mongoose").Model<Medicine, any, any, any, import("mongoose").Document<unknown, any, Medicine> & Medicine & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Medicine, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Medicine>> & import("mongoose").FlatRecord<Medicine> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class Inventory {
    numberOfMedicine?: number;
    numberOfMedicineGroup?: number;
    numberOfMedicineSold?: number;
    medicines: Medicine[];
}
export declare const InventorySchema: import("mongoose").Schema<Inventory, import("mongoose").Model<Inventory, any, any, any, import("mongoose").Document<unknown, any, Inventory> & Inventory & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Inventory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Inventory>> & import("mongoose").FlatRecord<Inventory> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export type PharmacistDocument = HydratedDocument<Pharmacist>;
export declare class Pharmacist {
    id: number;
    hospitalIds: number[];
    numberOfApprovals: number;
    name: string;
    email?: string;
    about?: string;
    profilePicture: string;
    location: string;
    phoneNumber: string;
    walletAddress: string;
    status: string;
    inventory: Inventory;
    approvalList: ApprovalList[];
    sharedPrescriptions: Prescriptions[];
    category: string;
    isVerified: boolean;
}
export declare const PharmacistSchema: import("mongoose").Schema<Pharmacist, import("mongoose").Model<Pharmacist, any, any, any, import("mongoose").Document<unknown, any, Pharmacist> & Pharmacist & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Pharmacist, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Pharmacist>> & import("mongoose").FlatRecord<Pharmacist> & {
    _id: import("mongoose").Types.ObjectId;
}>;
