import mongoose, { Types } from 'mongoose';

export interface MedicineType {
  name: string;
  price: number;
  quantity: number;
  sideEffects?: string;
  image?: string;
  _id?: mongoose.Types.ObjectId;
}

export interface ProductType {
  category: string;
  description?: string;
  medications: MedicineType[];
  _id?: mongoose.Types.ObjectId;
}

export interface DeleteMedicineInterface {
  walletAddress: string;
  productId: Types.ObjectId;
  medicineId: Types.ObjectId;
}

export interface FetchMedicineInterface extends DeleteMedicineInterface {}

export interface UpdateMedicineType {
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  sideEffects?: string;
  image?: string;
  medicineGroup?: string;
}

export interface DispenseHelper {
  walletAddress: string;
  category: string;
  productPrescribed: string;
}

export interface DispenseMedicineInterface {
  patientAddress: string;
  pharmacistAddress: string;
  productToDispense: string;
  directions: string;
  quantity: number;
  medicineId: Types.ObjectId;
}

export interface ReturnMedicationStatus {
  medicineExist?: boolean;
  categoryExist?: boolean;
  availableMedications?: MedicineType[];
}

export interface InventoryType {
  numberOfMedicine?: number;
  numberOfCategories?: number;
  numberOfMedicineSold?: number;
  products?: ProductType[];
}

export interface UpdateInventoryType {
  numberOfMedicine?: number;
  numberOfCategories?: number;
  numberOfMedicineSold?: number;
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
  about?: string;
  profilePicture?: string;
  location?: string;
  phoneNumber?: string;
}

export interface PharmacistType extends CreatePharmacistType {
  inventory: InventoryType;
  category: string;
  _id: mongoose.Types.ObjectId;
}
