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
import { PharmacistDao } from '../dao/pharmacist.dao';
import { CreatePharmacistType, MedicineType, UpdateMedicineType, UpdatePharmacistType } from '../interface/pharmacist.interface';
import { PharmacistGuard } from '../guards/pharmacist.guard';
import { ErrorCodes } from 'src/shared';
import { HospitalDao } from 'src/modules/hospital/dao/hospital.dao';
import { Types } from 'mongoose';
import { PatientDao } from 'src/modules/patient/dao/patient.dao';
import { OtpService } from '@/modules/otp/services/otp.service';
export declare class PharmacistService {
    private readonly pharmacistDao;
    private readonly pharmacistGuard;
    private readonly hospitalDao;
    private readonly patientDao;
    private readonly otpService;
    constructor(pharmacistDao: PharmacistDao, pharmacistGuard: PharmacistGuard, hospitalDao: HospitalDao, patientDao: PatientDao, otpService: OtpService);
    createPharmacist(args: CreatePharmacistType): Promise<{
        success: ErrorCodes;
        message: string;
        pharmacist?: undefined;
    } | {
        success: ErrorCodes;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    getPendingPharmacists(): Promise<{
        success: ErrorCodes;
        pharmacist: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        })[];
    }>;
    getApprovedPharmacists(): Promise<{
        success: ErrorCodes;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        })[];
    }>;
    getPharmacistByAddress(address: string): Promise<{
        success: ErrorCodes;
        message: string;
        pharmacist?: undefined;
    } | {
        success: ErrorCodes;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    getAllPharmacists(): Promise<{
        success: ErrorCodes;
        pharmacists: any[];
    } | {
        success: HttpStatus;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
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
            _id: Types.ObjectId;
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
    deleteMedicine(walletAddress: string, medicineId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    fetchMedicine(walletAddress: string, medicineId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
        medicine?: undefined;
    } | {
        success: HttpStatus;
        medicine: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Medicine> & import("../schema/pharmacist.schema").Medicine & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    fetchAllMedicine(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        medicines?: undefined;
    } | {
        success: HttpStatus;
        medicines: import("../schema/pharmacist.schema").Medicine[];
        message?: undefined;
    }>;
    fetchInventory(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        inventory?: undefined;
    } | {
        success: HttpStatus;
        inventory: {};
        message?: undefined;
    } | {
        success: HttpStatus;
        inventory: import("../schema/pharmacist.schema").Inventory;
        message?: undefined;
    }>;
    updateMedicine(walletAddress: string, medicineId: Types.ObjectId, args: UpdateMedicineType): Promise<{
        success: HttpStatus;
        message: string;
        updateMedicine?: undefined;
    } | {
        success: HttpStatus;
        updateMedicine: import("../schema/pharmacist.schema").Medicine;
        message?: undefined;
    }>;
    fetchAllSharedPrescriptions(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
        prescriptions?: undefined;
    } | {
        success: HttpStatus;
        prescriptions: import("../../patient/schemas/patient.schema").Prescriptions[];
        message?: undefined;
    }>;
    fetchPrescriptionById(args: {
        walletAddress: string;
        prescriptionId: Types.ObjectId;
    }): Promise<{
        success: HttpStatus;
        message: string;
        prescription?: undefined;
    } | {
        success: HttpStatus;
        prescription: import("../../patient/schemas/patient.schema").Prescriptions;
        message?: undefined;
    }>;
    dispensePrescription(args: {
        walletAddress: string;
        prescriptionId: Types.ObjectId;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removePrescription(args: {
        walletAddress: string;
        prescriptionId: Types.ObjectId;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
}
