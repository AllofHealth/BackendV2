import mongoose, { Types } from 'mongoose';
import { RoleType } from '@/modules/otp/interface/otp.interface';

export type InstitutionType =
  | 'general'
  | 'paediatric'
  | 'optical'
  | 'dental'
  | 'diagnostic'
  | 'physiotherapy'
  | 'referrals';

export interface CreateHospitalType {
  id: number;
  name: string;
  admin: string;
  email: string;
  phoneNo: string;
  location: string;
  profilePicture?: string;
  description?: string;
  type?: InstitutionType;
  regNo: string;
}

export interface PreviewType {
  id: number;
  walletAddress: string;
  profilePicture: string;
  name: string;
  status: string;
  category: string;
}

export interface HospitalType extends CreateHospitalType {
  doctors: PreviewType[];
  pharmacists: PreviewType[];
  category: string;
  _id: mongoose.Types.ObjectId;
}

export interface JoinHospitalType {
  hospitalId: Types.ObjectId;
  walletAddress: string;
}

export interface RemovePractitionerType extends JoinHospitalType {}

export interface ApprovePractitionerType extends JoinHospitalType {}

export interface UpdateHospitalProfileType {
  name?: string;
  email?: string;
  phoneNo?: string;
  location?: string;
  description?: string;
  profilePicture?: string;
  regNo?: string;
  type?: InstitutionType;
}

export interface IPurgePractitioner {
  walletAddress: string;
  hospitalId: Types.ObjectId;
  role: RoleType;
}