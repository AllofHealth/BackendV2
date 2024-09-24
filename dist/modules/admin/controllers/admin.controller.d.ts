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
import { HttpStatus } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto, UpdateAdminDto } from '../dto/admin.dto';
import { Types } from 'mongoose';
import { AdminErrors, AdminMessages } from '@/modules/admin/data/admin.data';
export declare class AdminController {
    private readonly adminService;
    private readonly logger;
    constructor(adminService: AdminService);
    getAllAdmins(ip: string): Promise<{
        success: HttpStatus;
        message: AdminErrors;
        data: any[];
    } | {
        success: HttpStatus;
        data: (import("mongoose").Document<unknown, {}, import("../schema/admin.schema").Admin> & import("../schema/admin.schema").Admin & {
            _id: Types.ObjectId;
        })[];
        message?: undefined;
    }>;
    getAdminByAddress(ip: string, walletAddress: string): Promise<(import("mongoose").Document<unknown, {}, import("../schema/admin.schema").Admin> & import("../schema/admin.schema").Admin & {
        _id: Types.ObjectId;
    }) | {
        success: import("../../../shared").ErrorCodes;
        message: AdminErrors;
    }>;
    getAllPractitioners(ip: string): Promise<{
        success: HttpStatus;
        allPractitioners: any[];
    }>;
    createAdmin(ip: string, createAdminDto: CreateAdminDto): Promise<{
        success: HttpStatus;
        message: AdminErrors;
        admin?: undefined;
    } | {
        success: HttpStatus;
        message: AdminMessages;
        admin: import("mongoose").Document<unknown, {}, import("../schema/admin.schema").Admin> & import("../schema/admin.schema").Admin & {
            _id: Types.ObjectId;
        };
    }>;
    updateAdmin(ip: string, walletAddress: string, updateAdminDto: UpdateAdminDto): Promise<{
        success: HttpStatus;
        message: AdminMessages;
    }>;
    approveHospital(ip: string, adminAddress: string, hospitalId: Types.ObjectId): Promise<{
        success: number;
        message: string;
    }>;
    authenticateAdmin(ip: string, adminAddress: string, walletAddress: string, id: number): Promise<{
        success: HttpStatus;
        message: AdminErrors;
    } | {
        success: HttpStatus;
        message: AdminMessages;
    }>;
    deleteAdmin(ip: string, adminAddressToAuthorize: string, adminAddressToRemove: string): Promise<{
        success: HttpStatus;
        message?: undefined;
    } | {
        success: import("../../../shared").ErrorCodes;
        message: AdminMessages;
    }>;
}
