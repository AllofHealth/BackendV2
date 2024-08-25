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
import { PROFILE_PLACEHOLDER } from '@/shared/constants';
import { ApprovalStatus } from '@/shared';

export class PharmacistDao {
  constructor(
    @InjectModel(Pharmacist.name)
    private readonly pharmacistModel: Model<Pharmacist>,
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<Medicine>,
    @InjectModel(Inventory.name)
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
      isVerified: false,
    });
  }

  async createMedicine(args: MedicineType) {
    return await this.medicineModel.create({
      name: args.name,
      price: args.price,
      quantity: args.quantity,
      description: args.description,
      sideEffects: args.sideEffects ? args.sideEffects : 'none',
      image: args.image,
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
    walletAddress: string,
    medicineId: Types.ObjectId,
    updateData: UpdateMedicineType,
  ) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      acc[`inventory.medicines.$.${key}`] = updateData[key];
      return acc;
    }, {});

    const result = await this.pharmacistModel.findOneAndUpdate(
      { walletAddress, 'inventory.medicines._id': medicineId },
      { $set: updates },
      { new: true, runValidators: true },
    );

    const medicine = result.inventory.medicines.find(
      (medicine: MedicineType) =>
        medicine._id.toString() === medicineId.toString(),
    );

    return medicine;
  }

  async deleteMedicine(medicineId: Types.ObjectId) {
    return await this.medicineModel.deleteOne({ _id: medicineId });
  }

  async deleteMedicineById(medicineId: Types.ObjectId) {
    return await this.medicineModel.deleteOne({ _id: medicineId });
  }

  async findMedicineById(medicineId: Types.ObjectId) {
    return await this.medicineModel.findOne({ _id: medicineId });
  }

  async pullMedicineById(
    pharmacistAddress: string,
    medicineId: Types.ObjectId,
  ) {
    return await this.pharmacistModel.findOneAndUpdate(
      { walletAddress: pharmacistAddress },
      { $pull: { 'inventory.medicines': { _id: medicineId } } },
    );
  }

  async pullOnePrescription(
    pharmacistAddress: string,
    prescriptionId: Types.ObjectId,
  ) {
    return await this.pharmacistModel.findOneAndUpdate(
      { walletAddress: pharmacistAddress },
      { $pull: { sharedPrescriptions: { _id: prescriptionId } } },
    );
  }

  async deletePharmacist(address: string) {
    return await this.pharmacistModel.deleteOne({ walletAddress: address });
  }
}
