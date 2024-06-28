export declare class CreatePharmacistDto {
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
export declare class UpdatePharmacistDto {
    name?: string;
    email?: string;
    profilePicture?: string;
    location?: string;
    regNo?: string;
    phoneNumber?: string;
}
export declare class AddMedicineDto {
    name: string;
    price: number;
    quantity: number;
    description: string;
    sideEffects?: string;
    image?: string;
    medicineGroup: string;
}
export declare class UpdateMedicineDto {
    name?: string;
    price?: number;
    quantity?: number;
    description?: string;
    sideEffects?: string;
    image?: string;
    medicineGroup?: string;
}
