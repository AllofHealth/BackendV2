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
import { PharmacistService } from '../services/pharmacist.service';
import { AddMedicineDto, CreatePharmacistDto, UpdatePharmacistDto } from '../dto/pharmacist.dto';
export declare class PharmacistController {
    private readonly pharmacistService;
    constructor(pharmacistService: PharmacistService);
    createPharmacist(createPharmacistDto: CreatePharmacistDto): Promise<{
        success: import("../../shared").ErrorCodes;
        message: string;
        pharmacist?: undefined;
    } | {
        success: import("../../shared").ErrorCodes;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    updatePharmacist(walletAddress: string, updatePharmacistDto: UpdatePharmacistDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        pharmacist?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    addMedicine(walletAddress: string, medicine: AddMedicineDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    getPharmacist(walletAddress: string): Promise<{
        success: import("../../shared").ErrorCodes;
        message: string;
        pharmacist?: undefined;
    } | {
        success: import("../../shared").ErrorCodes;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        };
        message?: undefined;
    }>;
    getApprovedPharmacists(): Promise<{
        success: import("../../shared").ErrorCodes;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getPendingPharmacists(): Promise<{
        success: import("../../shared").ErrorCodes;
        pharmacist: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getAllPharmacists(): Promise<{
        success: import("../../shared").ErrorCodes;
        pharmacists: any[];
    } | {
        success: import("@nestjs/common").HttpStatus;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    deletePharmacistByAddress(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
