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
import mongoose, { Types } from 'mongoose';
export interface CreateHospitalType {
    id: number;
    name: string;
    admin: string;
    email: string;
    phoneNo: string;
    location: string;
    profilePicture?: string;
    description?: string;
    status?: string;
}
export interface PreviewType {
    walletAddress: string;
    profilePicture: string;
    name: string;
    status: string;
    category: string;
}
export interface HospitalType extends CreateHospitalType {
    doctors: PreviewType[];
    pharmacists: PreviewType[];
    category: string;
    _id: mongoose.Types.ObjectId;
}
export interface JoinHospitalType {
    hospitalId: Types.ObjectId;
    walletAddress: string;
}
export interface RemovePractitionerType extends JoinHospitalType {
}
export interface ApprovePractitionerType extends JoinHospitalType {
}
export interface UpdateHospitalProfileType {
    name?: string;
    email?: string;
    phoneNo?: string;
    location?: string;
    description?: string;
    profilePicture?: string;
}
