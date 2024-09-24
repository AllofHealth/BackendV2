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
