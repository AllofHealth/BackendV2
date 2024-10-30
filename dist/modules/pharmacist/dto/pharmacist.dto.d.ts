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
import { Prescriptions } from '@/modules/patient/schemas/patient.schema';
import { ApprovalList, Inventory } from '@/modules/pharmacist/schema/pharmacist.schema';
import { Types } from 'mongoose';
import { MedicineDto, ProductDto } from '@/modules/medicine/dto/medicine.dto';
export declare class CreatePharmacistDto {
    id: number;
    hospitalIds?: number;
    name: string;
    email: string;
    profilePicture?: string;
    location: string;
    phoneNumber: string;
    walletAddress: string;
}
export declare class PharmacistDto {
    id: number;
    hospitalIds: number[];
    numberOfApprovals: number;
    name: string;
    email?: string;
    about?: string;
    profilePicture: string;
    location: string;
    phoneNumber: string;
    walletAddress: string;
    status: string;
    inventory: Inventory;
    approvalList: ApprovalList[];
    sharedPrescriptions: Prescriptions[];
    category: string;
    isVerified: boolean;
    _id: Types.ObjectId;
}
export declare class UpdatePharmacistDto {
    name?: string;
    email?: string;
    about?: string;
    profilePicture?: string;
    location?: string;
    phoneNumber?: string;
}
export declare class AddMedicineDto {
    name: string;
    price: number;
    quantity: number;
    sideEffects?: string;
    image?: string;
    category: string;
}
export declare class UpdateMedicineDto {
    name?: string;
    price?: number;
    quantity?: number;
    sideEffects?: string;
    image?: string;
}
export declare class DispenseMedicationDto {
    productToDispense: string;
    directions: string;
    quantity: number;
    medicineId: string;
}
export declare class DispenseReceiptDto {
    productToDispense: string;
    quantity: number;
    price: string;
}
export declare class InventoryDto {
    numberOfMedicine: number;
    numberOfCategories: number;
    numberOfMedicineSold: number;
    products: ProductDto[];
}
export declare class ProductExistDto {
    medicineExist: boolean;
    categoryExist: boolean;
    availableMedications: MedicineDto[];
}
