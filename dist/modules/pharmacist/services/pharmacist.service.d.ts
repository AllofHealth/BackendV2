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
import { CreatePharmacistType, DeleteMedicineInterface, DispenseHelper, DispenseMedicineInterface, FetchMedicineInterface, MedicineType, ReturnMedicationStatus, UpdateMedicineType, UpdatePharmacistType } from '../interface/pharmacist.interface';
import { PharmacistGuard } from '../guards/pharmacist.guard';
import { ErrorCodes } from '@/shared';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { Types } from 'mongoose';
import { PatientDao } from '@/modules/patient/dao/patient.dao';
import { OtpService } from '@/modules/otp/services/otp.service';
import { MedicineService } from '@/modules/medicine/service/medicine.service';
import { Prescriptions } from '@/modules/patient/schemas/patient.schema';
import { Product } from '../schema/pharmacist.schema';
export declare class PharmacistService {
    private readonly pharmacistDao;
    private readonly pharmacistGuard;
    private readonly hospitalDao;
    private readonly patientDao;
    private readonly otpService;
    private readonly medicineService;
    constructor(pharmacistDao: PharmacistDao, pharmacistGuard: PharmacistGuard, hospitalDao: HospitalDao, patientDao: PatientDao, otpService: OtpService, medicineService: MedicineService);
    createPharmacist(args: CreatePharmacistType): Promise<{
        success: HttpStatus;
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
        pharmacist: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
    }>;
    deletePharmacist(walletAddress: string): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    private fetchClassDescription;
    private capitalizeFirstLetter;
    private initMedication;
    private initInventory;
    private handleNoInventoryCreated;
    private handleInventoryUpdate;
    addMedicine(walletAddress: string, category: string, args: MedicineType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    deleteMedicine(args: DeleteMedicineInterface): Promise<{
        success: HttpStatus;
        message: string;
        result: import("mongoose").Document<unknown, {}, import("../schema/pharmacist.schema").Pharmacist> & import("../schema/pharmacist.schema").Pharmacist & {
            _id: Types.ObjectId;
        };
    }>;
    fetchMedicine(args: FetchMedicineInterface): Promise<import("../schema/pharmacist.schema").Medicine>;
    fetchAllProducts(walletAddress: string): Promise<{
        message: string;
        success: HttpStatus;
        products?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        products: Product[];
    }>;
    fetchProduct(args: {
        walletAddress: string;
        productId: Types.ObjectId;
    }): Promise<{
        success: HttpStatus;
        message: string;
        product: Product;
    }>;
    fetchInventory(walletAddress: string): Promise<{
        success: HttpStatus;
        inventory: import("../schema/pharmacist.schema").Inventory;
    }>;
    updateMedicine(args: FetchMedicineInterface, update: UpdateMedicineType): Promise<{
        success: HttpStatus;
        message: string;
    }>;
    checkMedicineExist(args: DispenseHelper): Promise<{
        success: HttpStatus;
        data: ReturnMedicationStatus;
    }>;
    fetchAllSharedPrescriptions(walletAddress: string): Promise<{
        success: HttpStatus;
        prescriptions: Prescriptions[];
    }>;
    fetchPrescriptionById(args: {
        walletAddress: string;
        prescriptionId: Types.ObjectId;
    }): Promise<{
        success: HttpStatus;
        prescription: Prescriptions;
    }>;
    dispensePrescription(args: DispenseMedicineInterface): Promise<{
        success: HttpStatus;
        message: string;
        data: {
            productName: string;
            quantity: number;
            price: string;
        };
    }>;
    removePrescription(args: {
        walletAddress: string;
        prescriptionId: Types.ObjectId;
    }): Promise<{
        success: HttpStatus;
        message: string;
    }>;
}
