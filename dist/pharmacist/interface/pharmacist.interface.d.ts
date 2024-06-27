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
import mongoose from 'mongoose';
export interface MedicineType {
    name: string;
    price: number;
    quantity: number;
    description: string;
    sideEffects: string;
    image: string;
    medicineGroup: string;
}
export interface InventoryType {
    numberOfMedicine: number;
    numberOfMedicineGroup: number;
    numberOfMedicineSold: number;
    medicines: MedicineType[];
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
    profilePicture?: string;
    location?: string;
    phoneNumber?: string;
}
export interface PharmacistType extends CreatePharmacistType {
    inventory: InventoryType;
    category: string;
    _id: mongoose.Types.ObjectId;
}
