export enum Category {
  Admin = 'admin',
  Doctor = 'doctor',
  Hospital = 'hospital',
  Pharmacist = 'pharmacist',
  Patient = 'patient',
  General = 'general',
}

export enum ApprovalStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
}

export enum RecordOwner {
  Patient = 'principal',
  FamilyMember = 'family member',
}

export enum Relationship {
  Father = 'father',
  Mother = 'mother',
  Brother = 'brother',
  Sister = 'sister',
  Aunt = 'aunt',
  Uncle = 'uncle',
  Nephew = 'nephew',
  Niece = 'niece',
  GrandFather = 'grandfather',
  GrandMother = 'grandmother',
  Grandson = 'grandson',
  Granddaughter = 'granddaughter',
  Son = 'son',
  Daughter = 'daughter',
  Wife = 'wife',
  Husband = 'husband',
  Friend = 'friend',
  Cousin = 'cousin',
  Other = 'other',
}

export enum ErrorCodes {
  Success = 200,
  NotFound = 404,
  Error = 500,
}

export enum ContractEvents {
  PatientAdded = 'event PatientAdded(address indexed patient, uint256 indexed patientId)',
  DoctorAdded = 'event DoctorAdded(address indexed doctor, uint256 indexed hospitalId, uint256 indexed doctorId)',
  PharmacistAdded = 'event PharmacistAdded(address indexed pharmacist, uint256 indexed hospitalId, uint256 indexed pharmacistId',
  HospitalCreated = ' event HospitalCreated(address indexed admin, uint256 indexed hospitalId)',
  SystemAdminAdded = 'event SystemAdminAdded(address indexed admin, uint256 indexed adminId)',
}

export enum EventNames {
  PatientAdded = 'PatientAdded',
  DoctorAdded = 'DoctorAdded',
  PharmacistAdded = 'PharmacistAdded',
  HospitalCreated = 'HospitalCreated',
  SystemAdminAdded = 'SystemAdminAdded',
}

export type ProfileType = {
  address: string;
  info: string;
};

export class AdminError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdminError';
  }
}

export class PatientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PatientError';
  }
}

export class PatientServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PatientServiceError';
  }
}

export class DoctorServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DoctorServiceError';
  }
}

export class PharmacistServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PharmacistServiceError';
  }
}

export class HospitalServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HospitalServiceError';
  }
}
export class DoctorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DoctorError';
  }
}

export class HospitalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HospitalError';
  }
}

export class PharmacistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PharmacistError';
  }
}

export class MetamaskError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Metamask is not installed');
    this.name = 'MetamaskError';
  }
}

export class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractError';
  }
}

export class AdminServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdminServiceError';
  }
}
