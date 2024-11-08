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
import mongoose, { Document, Types } from 'mongoose';
import { Patient, Prescriptions } from '@/modules/patient/schemas/patient.schema';
import { Receipt } from '@/modules/medicine/schema/medicine.schema';
import { Pharmacist } from '@/modules/pharmacist/schema/pharmacist.schema';
export interface MedicineType {
    name: string;
    price: number;
    quantity: number;
    sideEffects?: string;
    image?: string;
    _id?: mongoose.Types.ObjectId;
}
export interface ProductType {
    category: string;
    description?: string;
    medications: MedicineType[];
    _id?: mongoose.Types.ObjectId;
}
export interface DeleteMedicineInterface {
    walletAddress: string;
    productId: Types.ObjectId;
    medicineId: Types.ObjectId;
}
export interface FetchMedicineInterface extends DeleteMedicineInterface {
}
export interface UpdateMedicineType {
    name?: string;
    price?: number;
    quantity?: number;
    description?: string;
    sideEffects?: string;
    image?: string;
    medicineGroup?: string;
}
export interface DispenseHelper {
    walletAddress: string;
    category: string;
    productPrescribed: string;
}
export interface DispenseMedicineInterface {
    patientAddress: string;
    pharmacistAddress: string;
    productToDispense: string;
    directions: string;
    quantity: number;
    medicineId: Types.ObjectId;
}
export interface ReturnMedicationStatus {
    medicineExist?: boolean;
    categoryExist?: boolean;
    availableMedications?: MedicineType[];
}
export interface IHandleMedAvailability {
    medicineName: string;
    availableMedications: MedicineType[];
}
export interface IHandlePatientPrescriptionUpdate {
    prescription: Prescriptions;
    patient: Document<unknown, NonNullable<unknown>, Patient> & Patient & {
        _id: Types.ObjectId;
    };
    prescriptionReceipt: Document<unknown, NonNullable<unknown>, Receipt> & Receipt & {
        _id: Types.ObjectId;
    };
    medicineId: Types.ObjectId;
}
export interface InventoryType {
    numberOfMedicine?: number;
    numberOfCategories?: number;
    numberOfMedicineSold?: number;
    products?: ProductType[];
}
export interface UpdateInventoryType {
    numberOfMedicine?: number;
    numberOfCategories?: number;
    numberOfMedicineSold?: number;
}
export interface CreatePharmacistType {
    id: number;
    hospitalIds?: number;
    name: string;
    email: string;
    profilePicture?: string;
    location: string;
    phoneNumber: string;
    walletAddress: string;
    status?: string;
}
export interface UpdatePharmacistType {
    name?: string;
    email?: string;
    about?: string;
    profilePicture?: string;
    location?: string;
    phoneNumber?: string;
}
export interface PharmacistType extends Pharmacist {
    _id: Types.ObjectId;
}
