import mongoose from 'mongoose';

export interface MedicineType {
  name: string;
  price: number;
  quantity: number;
  description: string;
  sideEffects: string;
  image: string;
  medicineGroup: string;
}

export interface UpdateMedicineType {
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  sideEffects?: string;
  image?: string;
  medicineGroup?: string;
}

export interface InventoryType {
  numberOfMedicine: number;
  numberOfMedicineGroup: number;
  numberOfMedicineSold: number;
  medicines: MedicineType[];
}
export interface CreatePharmacistType {
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

export interface UpdatePharmacistType {
  name?: string;
  email?: string;
  profilePicture?: string;
  location?: string;
  phoneNumber?: string;
}

export interface PharmacistType extends CreatePharmacistType {
  inventory: InventoryType;
  category: string;
  _id: mongoose.Types.ObjectId;
}
