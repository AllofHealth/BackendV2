import { InjectModel } from '@nestjs/mongoose';
import {
  Inventory,
  Medicine,
  Pharmacist,
  Product,
} from '../schema/pharmacist.schema';
import { Model, Types } from 'mongoose';
import {
  CreatePharmacistType,
  MedicineType,
  ProductType,
  UpdateInventoryType,
  UpdateMedicineType,
  UpdatePharmacistType,
} from '../interface/pharmacist.interface';
import { MEDICINE_PLACEHOLDER, PROFILE_PLACEHOLDER } from '@/shared/constants';
import { ApprovalStatus } from '@/shared';

export class PharmacistDao {
  constructor(
    @InjectModel(Pharmacist.name)
    private readonly pharmacistModel: Model<Pharmacist>,
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<Medicine>,
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<Inventory>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
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
      isVerified: true,
    });
  }

  async createProduct(args: ProductType) {
    return await this.productModel.create({
      category: args.category,
      description: args.description ? args.description : 'none',
      medications: args.medications,
    });
  }

  async createMedicine(args: MedicineType) {
    return await this.medicineModel.create({
      name: args.name,
      price: args.price,
      quantity: args.quantity,
      sideEffects: args.sideEffects ? args.sideEffects : 'none',
      image: args.image ? args.image : MEDICINE_PLACEHOLDER,
    });
  }

  async createInventory() {
    const inventory = await this.inventoryModel.create({
      numberOfMedicines: 0,
      numberOfCategories: 0,
    });
    return inventory;
  }

  async fetchProductById(productId: Types.ObjectId, walletAddress: string) {
    const result = await this.pharmacistModel.findOne(
      {
        walletAddress,
        'inventory.products._id': productId,
      },
      { 'inventory.products.$': 1 },
    );

    if (result && result.inventory.products[0]) {
      return result.inventory.products[0];
    }

    return null;
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
    productId: Types.ObjectId,
    updateData: UpdateMedicineType,
  ) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      acc[
        `inventory.products.$[productElem].medications.$[medicineElem].${key}`
      ] = updateData[key];
      return acc;
    }, {});

    const result = await this.pharmacistModel.updateOne(
      {
        walletAddress,
        'inventory.products._id': productId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
        arrayFilters: [
          { 'productElem._id': productId },
          { 'medicineElem._id': medicineId },
        ],
      },
    );

    return result;
  }

  async updateInventory(args: {
    walletAddress: string;
    update: UpdateInventoryType;
  }) {
    const updates = Object.keys(args.update).reduce((acc, key) => {
      acc[`inventory.${key}`] = args.update[key];
      return acc;
    }, {});

    return await this.pharmacistModel.findOneAndUpdate(
      { walletAddress: args.walletAddress },
      { $set: updates },
      { new: true, runValidators: true },
    );
  }

  async findMedicineById(
    walletAddress: string,
    medicineId: Types.ObjectId,
    productId: Types.ObjectId,
  ) {
    const product = await this.fetchProductById(productId, walletAddress);

    return product.medications.find(
      (med: MedicineType) => med._id.toString() === medicineId.toString(),
    );
  }

  async pullMedicineById(
    pharmacistAddress: string,
    productId: Types.ObjectId,
    medicineId: Types.ObjectId,
  ) {
    return await this.pharmacistModel.findOneAndUpdate(
      { walletAddress: pharmacistAddress, 'inventory.products._id': productId },
      { $pull: { 'inventory.products.$.medications': { _id: medicineId } } },
      { new: true },
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
