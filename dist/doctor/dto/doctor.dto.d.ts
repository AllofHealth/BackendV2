export declare class CreateDoctorDto {
    id: number;
    hospitalIds: number;
    name: string;
    email: string;
    profilePicture: string;
    specialty: string;
    location: string;
    phoneNumber: string;
    walletAddress: string;
    status: string;
}
export declare class UpdateDoctorDto {
    name: string;
    email: string;
    profilePicture: string;
    specialty: string;
    location: string;
    phoneNumber: string;
}
export declare class CreatePrescriptionDto {
    recordId: number;
    medicineName: string;
    medicineId: string;
    medicineGroup?: string;
    description: string;
    sideEffects: string;
}
export declare class CreateMedicalRecordDto {
    recordId: number;
    diagnosis: string;
}
