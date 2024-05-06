export type ApprovalType = 'view' | 'full';
export type RecordOwnerType = 'principal' | 'family member';

export interface ActiveApprovalType {
  patientId: number;
  patientName: string;
  recordId?: number;
  profilePicture?: string;
  patientAddress: string;
  approvalType: ApprovalType;
  approvalStatus?: string;
  approvalTime?: Date;
  recordOwner?: RecordOwnerType;
}

export interface CreateDoctorType {
  id: number;
  hospitalIds?: number;
  name: string;
  email: string;
  profilePicture?: string;
  specialty: string;
  location: string;
  phoneNumber: string;
  walletAddress: string;
  regNo: string;
  status?: string;
}

export interface UpdateDoctorType {
  name?: string;
  email?: string;
  profilePicture?: string;
  specialty?: string;
  location?: string;
  regNo?: string;
  phoneNumber?: string;
}

export interface DoctorType {
  id: number;
  hospitalIds?: number[];
  name: string;
  email: string;
  profilePicture?: string;
  specialty: string;
  location: string;
  phoneNumber: string;
  walletAddress: string;
  regNo: string;
  numberOfApprovals: number;
  activeApprovals: ActiveApprovalType[];
  status: string;
  category: string;
}
