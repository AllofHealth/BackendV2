import mongoose from 'mongoose';

export interface CreateHospitalType {
  id: number;
  name: string;
  admin: string;
  email: string;
  phoneNo: string;
  regNo: string;
  location: string;
  profilePicture?: string;
  description?: string;
  status?: string;
}

export interface PreviewType {
  walletAddress: string;
  profilePicture: string;
  name: string;
  regNo: string;
  status: string;
}

export interface HospitalType extends CreateHospitalType {
  doctors: PreviewType[];
  pharmacists: PreviewType[];
  category: string;
  _id: mongoose.Types.ObjectId;
}

export interface ApprovePractitionerType {
  practitionerAddress: string;
  adminAddress: string;
  hospitalId: string;
  hospitalBlockchainId: number;
}

export interface JoinHospitalType {
  hospitalId: string;
  walletAddress: string;
  category: string;
}

export interface UpdateHospitalProfileType {
  hospitalId: string;
  name?: string;
  email?: string;
  phoneNo?: string;
  regNo?: string;
  location?: string;
  description?: string;
  profilePicture?: string;
}
