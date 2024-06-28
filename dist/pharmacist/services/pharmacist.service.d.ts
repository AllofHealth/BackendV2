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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus } from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
import { CreatePharmacistType, MedicineType, UpdatePharmacistType } from '../interface/pharmacist.interface';
import { PharmacistGuard } from '../guards/pharmacist.guard';
import { ErrorCodes } from 'src/shared';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
export declare class PharmacistService {
    private readonly pharmacistDao;
    private readonly pharmacistGuard;
    private readonly hospitalDao;
    constructor(pharmacistDao: PharmacistDao, pharmacistGuard: PharmacistGuard, hospitalDao: HospitalDao);
    createPharmacist(args: CreatePharmacistType): Promise<{
        success: ErrorCodes;
        message: string;
        pharmacist?: undefined;
    } | {
        success: ErrorCodes;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    getPendingPharmacists(): Promise<{
        success: ErrorCodes;
        pharmacist: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getApprovedPharmacists(): Promise<{
        success: ErrorCodes;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getPharmacistByAddress(address: string): Promise<{
        success: ErrorCodes;
        message: string;
        pharmacist?: undefined;
    } | {
        success: ErrorCodes;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllPharmacists(): Promise<{
        success: ErrorCodes;
        pharmacists: any[];
    } | {
        success: HttpStatus;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    updatePharmacist(walletAddress: string, args: UpdatePharmacistType): Promise<{
        success: HttpStatus;
        message: string;
        pharmacist?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deletePharmacist(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    addMedicine(walletAddress: string, args: MedicineType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
}
