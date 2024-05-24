import mongoose, { Types } from 'mongoose';

export interface CreateHospitalType {
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

export interface PreviewType {
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
  hospitalId: string;
  name?: string;
  email?: string;
  phoneNo?: string;
  location?: string;
  description?: string;
  profilePicture?: string;
}
