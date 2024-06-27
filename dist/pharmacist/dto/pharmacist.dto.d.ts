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
