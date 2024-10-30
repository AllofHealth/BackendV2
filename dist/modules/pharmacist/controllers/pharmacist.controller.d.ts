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
import { PharmacistService } from '../services/pharmacist.service';
import { AddMedicineDto, CreatePharmacistDto, DispenseMedicationDto, UpdateMedicineDto, UpdatePharmacistDto } from '../dto/pharmacist.dto';
import { Types } from 'mongoose';
export declare class PharmacistController {
    private readonly pharmacistService;
    private readonly logger;
    constructor(pharmacistService: PharmacistService);
    createPharmacist(ip: string, createPharmacistDto: CreatePharmacistDto): Promise<{
        success: HttpStatus;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
        message: string;
    }>;
    updatePharmacist(ip: string, walletAddress: string, updatePharmacistDto: UpdatePharmacistDto): Promise<{
        success: HttpStatus;
        message: string;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
    }>;
    addMedicine(ip: string, walletAddress: string, medicine: AddMedicineDto): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    removeMedicine(ip: string, walletAddress: string, productId: Types.ObjectId, medicineId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
        result: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
    }>;
    updateMedicine(ip: string, walletAddress: string, medicineId: Types.ObjectId, productId: Types.ObjectId, data: UpdateMedicineDto): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    dispensePrescription(ip: string, patientAddress: string, pharmacistAddress: string, dispenseDto: DispenseMedicationDto): Promise<{
        success: HttpStatus;
        message: string;
        data: {
            productName: string;
            quantity: number;
            price: string;
        };
    }>;
    removePrescription(ip: string, walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    getPharmacist(ip: string, walletAddress: string): Promise<{
        success: import("../../../shared").ErrorCodes;
        message: string;
        pharmacist?: undefined;
    } | {
        success: import("../../../shared").ErrorCodes;
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
        message?: undefined;
    }>;
    getApprovedPharmacists(ip: string): Promise<{
        success: import("../../../shared").ErrorCodes;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        })[];
    }>;
    getPendingPharmacists(ip: string): Promise<{
        success: import("../../../shared").ErrorCodes;
        pharmacist: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        })[];
    }>;
    getAllPharmacists(ip: string): Promise<{
        success: import("../../../shared").ErrorCodes;
        pharmacists: any[];
    } | {
        success: HttpStatus;
        pharmacists: (import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        })[];
    }>;
    deletePharmacistByAddress(ip: string, walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    getMedicine(ip: string, walletAddress: string, productId: Types.ObjectId, medicineId: Types.ObjectId): Promise<import("../schema/pharmacist.schema").Medicine>;
    fetchProduct(ip: string, walletAddress: string, productId: Types.ObjectId): Promise<{
        success: HttpStatus;
        message: string;
        product: import("../schema/pharmacist.schema").Product;
    }>;
    getAllProducts(ip: string, walletAddress: string): Promise<{
        message: string;
        success: HttpStatus;
        products?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        products: import("../schema/pharmacist.schema").Product[];
    }>;
    getInventory(ip: string, walletAddress: string): Promise<{
        status: HttpStatus;
        message: string;
        success?: undefined;
        inventory?: undefined;
    } | {
        success: HttpStatus;
        inventory: import("../schema/pharmacist.schema").Inventory;
        status?: undefined;
        message?: undefined;
    }>;
    getAllSharedPrescriptions(ip: string, walletAddress: string): Promise<{
        success: HttpStatus;
        prescriptions: import("../../patient/schemas/patient.schema").Prescriptions[];
    }>;
    getSharedPrescription(ip: string, walletAddress: string, prescriptionId: Types.ObjectId): Promise<{
        success: HttpStatus;
        prescription: import("../../patient/schemas/patient.schema").Prescriptions;
    }>;
    checkProductExist(ip: string, walletAddress: string, category: string, productPrescribed: string): Promise<{
        success: HttpStatus;
        data: import("../interface/pharmacist.interface").ReturnMedicationStatus;
    }>;
}
