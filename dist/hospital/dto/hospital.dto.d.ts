export declare class CreateHospitalDto {
    id: number;
    name: string;
    admin: string;
    email: string;
    phoneNo: string;
    location: string;
    profilePicture?: string;
    description?: string;
    status?: string;
}
export declare class UpdateHospitalProfileDto {
    name?: string;
    email?: string;
    phoneNo?: string;
    location?: string;
    description?: string;
    profilePicture?: string;
}
export declare class JoinHospitalDto {
    walletAddress: string;
}
export declare class RemovePractitionerDto {
    walletAddress: string;
}
export declare class ApprovePractitionerDto {
    walletAddress: string;
}
