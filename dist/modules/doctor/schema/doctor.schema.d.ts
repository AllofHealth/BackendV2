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
export declare class Approval extends Document {
    patientId: number;
    patientName: string;
    recordId: number;
    profilePicture: string;
    approvalType: string;
    approvalStatus: string;
    approvalDuration: Date;
    recordOwner: string;
    recordTag: string;
}
export declare const ApprovalSchema: import("mongoose").Schema<Approval, import("mongoose").Model<Approval, any, any, any, Document<unknown, any, Approval> & Approval & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Approval, Document<unknown, {}, import("mongoose").FlatRecord<Approval>> & import("mongoose").FlatRecord<Approval> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export type DoctorDocument = HydratedDocument<Doctor>;
export declare class Doctor {
    id: number;
    hospitalIds: number[];
    name: string;
    email: string;
    about: string;
    profilePicture: string;
    specialty: string;
    location: string;
    phoneNumber: string;
    walletAddress: string;
    numberOfApprovals: number;
    activeApprovals: Approval[];
    status: string;
    category: string;
    isVerified: boolean;
}
export declare const DoctorSchema: import("mongoose").Schema<Doctor, import("mongoose").Model<Doctor, any, any, any, Document<unknown, any, Doctor> & Doctor & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Doctor, Document<unknown, {}, import("mongoose").FlatRecord<Doctor>> & import("mongoose").FlatRecord<Doctor> & {
    _id: import("mongoose").Types.ObjectId;
}>;
