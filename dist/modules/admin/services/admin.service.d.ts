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
import { Admin } from '../schema/admin.schema';
import { AuthenticateAdminInterface, CreateAdminType, RemoveAdminType, UpdateAdminProfileType } from '../interface/admin.interface';
import { Model, Types } from 'mongoose';
import { ErrorCodes } from '@/shared';
import { AdminDao } from '../dao/admin.dao';
import { AdminGuard } from '../guards/admin.guard';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { OtpService } from '@/modules/otp/services/otp.service';
export declare class AdminService {
    private adminModel;
    private readonly adminDao;
    private readonly adminGuard;
    private readonly hospitalDao;
    private readonly doctorDao;
    private readonly pharmacistDao;
    private readonly otpService;
    private logger;
    constructor(adminModel: Model<Admin>, adminDao: AdminDao, adminGuard: AdminGuard, hospitalDao: HospitalDao, doctorDao: DoctorDao, pharmacistDao: PharmacistDao, otpService: OtpService);
    fetchAdminByAddress(walletAddress: string): Promise<(import("mongoose").Document<unknown, {}, Admin> & Admin & {
        _id: Types.ObjectId;
    }) | {
        success: ErrorCodes;
        message: string;
    }>;
    isAdminAuthenticated(walletAddress: string): Promise<boolean | {
        success: ErrorCodes;
        message: string;
    }>;
    fetchAllAdmins(): Promise<(import("mongoose").Document<unknown, {}, Admin> & Admin & {
        _id: Types.ObjectId;
    })[]>;
    authenticateAdmin(args: AuthenticateAdminInterface): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    createNewAdmin(args: CreateAdminType): Promise<{
        success: HttpStatus;
        message: string;
        admin?: undefined;
    } | {
        success: ErrorCodes;
        admin: import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    removeAdmin(args: RemoveAdminType): Promise<{
        success: HttpStatus;
        message: string;
    } | {
        success: ErrorCodes;
        message: string;
    }>;
    approveHospital(args: {
        hospitalId: Types.ObjectId;
    }): Promise<{
        success: number;
        message: string;
    }>;
    updateAdmin(args: {
        walletAddress: string;
        data: UpdateAdminProfileType;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    editAdmin(args: {
        walletAddress: string;
        replaceAddress: string;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    fetchAllPractitioners(): Promise<{
        success: HttpStatus;
        allPractitioners: any[];
    }>;
}
