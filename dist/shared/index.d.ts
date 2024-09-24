export declare enum Category {
    Admin = "admin",
    Doctor = "doctor",
    Hospital = "hospital",
    Pharmacist = "pharmacist",
    Patient = "patient",
    General = "general"
}
export declare enum ApprovalStatus {
    Approved = "approved",
    Rejected = "rejected",
    Pending = "pending"
}
export declare enum RecordOwner {
    Patient = "principal",
    FamilyMember = "family member"
}
export declare enum Relationship {
    Father = "father",
    Mother = "mother",
    Brother = "brother",
    Sister = "sister",
    Aunt = "aunt",
    Uncle = "uncle",
    Nephew = "nephew",
    Niece = "niece",
    GrandFather = "grandfather",
    GrandMother = "grandmother",
    Grandson = "grandson",
    Granddaughter = "granddaughter",
    Son = "son",
    Daughter = "daughter",
    Wife = "wife",
    Husband = "husband",
    Friend = "friend",
    Cousin = "cousin",
    Other = "other"
}
export declare enum ErrorCodes {
    Success = 200,
    NotFound = 404,
    Error = 500
}
export declare enum ContractEvents {
    PatientAdded = "event PatientAdded(address indexed patient, uint256 indexed patientId)",
    DoctorAdded = "event DoctorAdded(address indexed doctor, uint256 indexed hospitalId, uint256 indexed doctorId)",
    PharmacistAdded = "event PharmacistAdded(address indexed pharmacist, uint256 indexed hospitalId, uint256 indexed pharmacistId",
    HospitalCreated = " event HospitalCreated(address indexed admin, uint256 indexed hospitalId)",
    SystemAdminAdded = "event SystemAdminAdded(address indexed admin, uint256 indexed adminId)"
}
export declare enum EventNames {
    PatientAdded = "PatientAdded",
    DoctorAdded = "DoctorAdded",
    PharmacistAdded = "PharmacistAdded",
    HospitalCreated = "HospitalCreated",
    SystemAdminAdded = "SystemAdminAdded"
}
export type ProfileType = {
    address: string;
    info: string;
};
export declare class AdminError extends Error {
    constructor(message: string);
}
export declare class PatientError extends Error {
    constructor(message: string);
}
export declare class PatientServiceError extends Error {
    constructor(message: string);
}
export declare class DoctorServiceError extends Error {
    constructor(message: string);
}
export declare class PharmacistServiceError extends Error {
    constructor(message: string);
}
export declare class HospitalServiceError extends Error {
    constructor(message: string);
}
export declare class DoctorError extends Error {
    constructor(message: string);
}
export declare class HospitalError extends Error {
    constructor(message: string);
}
export declare class PharmacistError extends Error {
    constructor(message: string);
}
export declare class MetamaskError extends Error {
    constructor(message?: string);
}
export declare class ContractError extends Error {
    constructor(message: string);
}
export declare class AdminServiceError extends Error {
    constructor(message: string);
}
