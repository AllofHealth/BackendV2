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
import { Types } from 'mongoose';
import { Admin } from '@/modules/admin/schema/admin.schema';
export declare class ApproveHospitalDto {
    hospitalId: Types.ObjectId;
    adminAddress: string;
}
export declare class CreateAdminDto {
    name: string;
    profilePicture?: string;
    email: string;
    walletAddress: string;
}
declare const AdminDto_base: import("@nestjs/mapped-types").MappedType<Partial<Admin>>;
export declare class AdminDto extends AdminDto_base {
    id: number;
    name: string;
    profilePicture: string;
    email: string;
    walletAddress: string;
    category: string;
    isAuthenticated: boolean;
    isVerified: boolean;
    _id: Types.ObjectId;
}
export declare class RemoveAdminDto {
    adminAddressToAuthorize: string;
    adminAddressToRemove: string;
}
export declare class UpdateAdminDto {
    name?: string;
    profilePicture?: string;
    email?: string;
}
export {};
