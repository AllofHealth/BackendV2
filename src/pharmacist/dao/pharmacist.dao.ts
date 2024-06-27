import { InjectModel } from '@nestjs/mongoose';
import { Inventory, Medicine, Pharmacist } from '../schema/pharmacist.schema';
import { Model, Types } from 'mongoose';
import {
  CreatePharmacistType,
  InventoryType,
  MedicineType,
  UpdateMedicineType,
  UpdatePharmacistType,
} from '../interface/pharmacist.interface';
import { PROFILE_PLACEHOLDER } from 'src/shared/constants';
import { ApprovalStatus } from 'src/shared';

export class PharmacistDao {
  constructor(
    @InjectModel(Pharmacist.name)
    private readonly pharmacistModel: Model<Pharmacist>,
    private readonly medicineModel: Model<Medicine>,
    private readonly inventoryModel: Model<Inventory>,
  ) {}
  async createNewPharmacist(pharmacist: CreatePharmacistType) {
    return await this.pharmacistModel.create({
      id: pharmacist.id,
      name: pharmacist.name,
      email: pharmacist.email,
      profilePicture: pharmacist.profilePicture
        ? pharmacist.profilePicture
        : PROFILE_PLACEHOLDER,
      location: pharmacist.location,
      phoneNumber: pharmacist.phoneNumber,
      walletAddress: pharmacist.walletAddress,
      status: ApprovalStatus.Pending,
    });
  }

  async createMedicine(args: MedicineType) {
    return await this.medicineModel.create({
      name: args.name,
      price: args.price,
      quantity: args.quantity,
      description: args.description,
      sideEffects: args.sideEffects ? args.sideEffects : 'none',
      image: args.image ? args.image : 'https://pixy.org/src/144/1448676.jpg',
      medicineGroup: args.medicineGroup,
    });
  }

  async createInventory(args: InventoryType) {
    return await this.inventoryModel.create({
      numberOfMedicine: args.numberOfMedicine,
      numberOfMedicineGroup: args.numberOfMedicineGroup,
      numberOfMedicineSold: args.numberOfMedicineSold,
      medicines: args.medicines,
    });
  }

  async fetchPharmacist(id: number) {
    return await this.pharmacistModel.findOne({ id });
  }

  async fetchPharmacistByAddress(address: string) {
    return await this.pharmacistModel.findOne({ walletAddress: address });
  }

  async fetchAllPharmacists() {
    return await this.pharmacistModel.find();
  }

  async fetchPharmacistWithPendingStatus() {
    return await this.pharmacistModel.find({ status: ApprovalStatus.Pending });
  }

  async fetchPharmacistsWithApprovedStatus() {
    return await this.pharmacistModel.find({ status: ApprovalStatus.Approved });
  }

  async updatePharmacist(address: string, updateData: UpdatePharmacistType) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    const result = await this.pharmacistModel.findOneAndUpdate(
      { walletAddress: address },
      { $set: updates },
      { new: true, runValidators: true },
    );

    return result;
  }

  async updateMedicine(
    medicineId: Types.ObjectId,
    updateData: UpdateMedicineType,
  ) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    const result = await this.medicineModel.findOneAndUpdate(
      { _id: medicineId },
      { $set: updates },
      { new: true, runValidators: true },
    );

    return result;
  }

  async deleteMedicine(medicineId: Types.ObjectId) {
    return await this.medicineModel.deleteOne({ _id: medicineId });
  }

  async deletePharmacist(address: string) {
    return await this.pharmacistModel.deleteOne({ walletAddress: address });
  }
}
