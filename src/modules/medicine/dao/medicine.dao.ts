import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Medication,
  MedicineCategories,
  Receipt,
} from '../schema/medicine.schema';
import { Model, Types } from 'mongoose';
import {
  CreateMedicineInterface,
  CreateReceiptInterface,
} from '../interface/medicine.interface';
import { drugClasses } from '@/shared/constants';

@Injectable()
export class MedicineDao {
  constructor(
    @InjectModel(Medication.name) private readonly medicine: Model<Medication>,
    @InjectModel(MedicineCategories.name)
    private readonly categories: Model<MedicineCategories>,
    @InjectModel(Receipt.name) private readonly receipt: Model<Receipt>,
  ) {}

  async createMedicine(args: CreateMedicineInterface) {
    return await this.medicine.create(args);
  }

  async createReceipt(args: CreateReceiptInterface) {
    return await this.receipt.create({
      productDispensed: args.productDispensed,
      dateDispensed: new Date(Date.now()),
      directions: args.directions,
      quantity: args.quantity,
      price: args.price,
    });
  }

  async getAllCategories() {
    return await this.categories.find();
  }

  async createCategories() {
    return await this.categories.create({ category: drugClasses });
  }

  async deleteReceipt(id: Types.ObjectId) {
    return this.receipt.deleteOne({ _id: id });
  }
}
