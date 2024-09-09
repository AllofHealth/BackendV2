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
import { AdminService } from '../services/admin.service';
import { CreateAdminDto, UpdateAdminDto } from '../dto/admin.dto';
import { Types } from 'mongoose';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllAdmins(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/admin.schema").Admin> & import("../schema/admin.schema").Admin & {
        _id: Types.ObjectId;
    })[]>;
    getAdminByAddress(walletAddress: string): Promise<(import("mongoose").Document<unknown, {}, import("../schema/admin.schema").Admin> & import("../schema/admin.schema").Admin & {
        _id: Types.ObjectId;
    }) | {
        success: import("../../../shared").ErrorCodes;
        message: string;
    }>;
    getAllPractitioners(): Promise<{
        success: import("@nestjs/common").HttpStatus;
        allPractitioners: any[];
    }>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        admin?: undefined;
    } | {
        success: import("../../../shared").ErrorCodes;
        admin: import("mongoose").Document<unknown, {}, import("../schema/admin.schema").Admin> & import("../schema/admin.schema").Admin & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    updateAdmin(walletAddress: string, updateAdminDto: UpdateAdminDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approveHospital(adminAddress: string, hospitalId: Types.ObjectId): Promise<{
        success: number;
        message: string;
    }>;
    authenticateAdmin(adminAddress: string, walletAddress: string, id: number): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    modifyAddress(walletAddress: string, replaceAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    deleteAdmin(adminAddressToAuthorize: string, adminAddressToRemove: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    } | {
        success: import("../../../shared").ErrorCodes;
        message: string;
    }>;
}
