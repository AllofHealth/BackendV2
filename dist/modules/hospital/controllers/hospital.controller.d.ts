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
import { HospitalService } from '../services/hospital.service';
import { Types } from 'mongoose';
import { CreateHospitalDto, UpdateHospitalProfileDto } from '../dto/hospital.dto';
export declare class HospitalController {
    private readonly hospitalService;
    constructor(hospitalService: HospitalService);
    createHospital(createHospitalDto: CreateHospitalDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        hospital?: undefined;
    } | {
        success: import("../../../shared").ErrorCodes;
        hospital: import("mongoose").Document<unknown, {}, import("../schema/hospital.schema").Hospital> & import("../schema/hospital.schema").Hospital & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    joinHospital(hospitalId: Types.ObjectId, joinHospitalDto: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    approvePractitioner(adminAddress: string, hospitalId: Types.ObjectId, practitionerAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    removePractitioner(adminAddress: string, hospitalId: Types.ObjectId, practitionerAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    delegateAdmin(adminAddress: string, newAdminAddress: string, hospitalId: Types.ObjectId): Promise<{
        success: number;
        message: string;
    }>;
    updateHospital(adminAddress: string, hospitalId: Types.ObjectId, updateHospitalDto: UpdateHospitalProfileDto): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        updatedHospital?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        message: string;
        updatedHospital: import("mongoose").Document<unknown, {}, import("../schema/hospital.schema").Hospital> & import("../schema/hospital.schema").Hospital & {
            _id: Types.ObjectId;
        };
    }>;
    getHospitalById(hospitalId: Types.ObjectId): Promise<{
        success: import("../../../shared").ErrorCodes;
        message: string;
        hospital?: undefined;
    } | {
        success: import("../../../shared").ErrorCodes;
        hospital: {
            regNo: string;
            id: number;
            name: string;
            admin: string;
            email: string;
            phoneNo: string;
            location: string;
            profilePicture: string;
            description: string;
            doctors: import("../interface/hospital.interface").PreviewType[];
            pharmacists: import("../interface/hospital.interface").PreviewType[];
            status: string;
            category: string;
            isVerified: boolean;
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllHospitals(): Promise<{
        success: import("../../../shared").ErrorCodes;
        hospitals: (import("mongoose").Document<unknown, {}, import("../schema/hospital.schema").Hospital> & import("../schema/hospital.schema").Hospital & {
            _id: Types.ObjectId;
        })[];
    }>;
    getApprovedHospitals(): Promise<{
        success: number;
        hospitals: (import("mongoose").Document<unknown, {}, import("../schema/hospital.schema").Hospital> & import("../schema/hospital.schema").Hospital & {
            _id: Types.ObjectId;
        })[];
    }>;
    getPendingHospitals(): Promise<{
        success: number;
        hospitals: (import("mongoose").Document<unknown, {}, import("../schema/hospital.schema").Hospital> & import("../schema/hospital.schema").Hospital & {
            _id: Types.ObjectId;
        })[];
    }>;
    getApprovedDoctors(hospitalId: Types.ObjectId): Promise<{
        success: import("../../../shared").ErrorCodes;
        doctors: import("../interface/hospital.interface").PreviewType[];
        message: string;
    }>;
    getPendingDoctors(hospitalId: Types.ObjectId): Promise<{
        success: import("../../../shared").ErrorCodes;
        doctors: import("../interface/hospital.interface").PreviewType[];
        message: string;
    }>;
    getAllDoctors(hospitalId: Types.ObjectId): Promise<{
        success: import("../../../shared").ErrorCodes;
        doctors: import("../interface/hospital.interface").PreviewType[];
    }>;
    getApprovedPharmacists(hospitalId: Types.ObjectId): Promise<{
        success: import("../../../shared").ErrorCodes;
        pharmacists: import("../interface/hospital.interface").PreviewType[];
        message: string;
    }>;
    getPendingPharmacists(hospitalId: Types.ObjectId): Promise<{
        success: import("../../../shared").ErrorCodes;
        pharmacists: import("../interface/hospital.interface").PreviewType[];
        message: string;
    }>;
    getAllPharmacists(hospitalId: Types.ObjectId): Promise<{
        success: import("../../../shared").ErrorCodes;
        pharmacists: import("../interface/hospital.interface").PreviewType[];
    }>;
    getAllPractitioners(hospitalId: Types.ObjectId): Promise<{
        success: import("@nestjs/common").HttpStatus;
        practitioners: import("../interface/hospital.interface").PreviewType[];
    }>;
    getPractitionerCreatedHospital(walletAddress: string): Promise<{
        success: import("@nestjs/common").HttpStatus;
        message: string;
        hospitals?: undefined;
    } | {
        success: import("@nestjs/common").HttpStatus;
        hospitals: (import("mongoose").Document<unknown, {}, import("../schema/hospital.schema").Hospital> & import("../schema/hospital.schema").Hospital & {
            _id: Types.ObjectId;
        })[];
        message?: undefined;
    }>;
}
