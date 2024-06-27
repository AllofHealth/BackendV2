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
import { Document, HydratedDocument } from 'mongoose';
import { PreviewType } from '../interface/hospital.interface';
export type DoctorDocument = Doctor & Document;
export declare class Doctor {
    walletAddress: string;
    hospitalIds: number[];
    profilePicture: string;
    name: string;
    status: string;
    category: string;
}
export declare const DoctorSchema: import("mongoose").Schema<Doctor, import("mongoose").Model<Doctor, any, any, any, Document<unknown, any, Doctor> & Doctor & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Doctor, Document<unknown, {}, import("mongoose").FlatRecord<Doctor>> & import("mongoose").FlatRecord<Doctor> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export type PharmacistDocument = Pharmacist & Document;
export declare class Pharmacist {
    walletAddress: string;
    hospitalIds: number[];
    profilePicture: string;
    name: string;
    status: string;
    category: string;
}
export declare const PharmacistSchema: import("mongoose").Schema<Pharmacist, import("mongoose").Model<Pharmacist, any, any, any, Document<unknown, any, Pharmacist> & Pharmacist & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Pharmacist, Document<unknown, {}, import("mongoose").FlatRecord<Pharmacist>> & import("mongoose").FlatRecord<Pharmacist> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export type HospitalDocument = HydratedDocument<Hospital>;
export declare class Hospital {
    id: number;
    name: string;
    admin: string;
    email: string;
    phoneNo: string;
    location: string;
    profilePicture: string;
    description: string;
    doctors: PreviewType[];
    pharmacists: PreviewType[];
    status: string;
    category: string;
}
export declare const HospitalSchema: import("mongoose").Schema<Hospital, import("mongoose").Model<Hospital, any, any, any, Document<unknown, any, Hospital> & Hospital & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hospital, Document<unknown, {}, import("mongoose").FlatRecord<Hospital>> & import("mongoose").FlatRecord<Hospital> & {
    _id: import("mongoose").Types.ObjectId;
}>;
