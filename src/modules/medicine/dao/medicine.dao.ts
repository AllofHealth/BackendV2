import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Medication, MedicineCategories } from '../schema/medicine.schema';
import { Model } from 'mongoose';
import { CreateMedicineInterface } from '../interface/medicine.interface';
import { drugClasses } from '@/shared/constants';

@Injectable()
export class MedicineDao {
  constructor(
    @InjectModel(Medication.name) private readonly medicine: Model<Medication>,
    @InjectModel(MedicineCategories.name)
    private readonly categories: Model<MedicineCategories>,
  ) {}

  async createMedicine(args: CreateMedicineInterface) {
    return await this.medicine.create(args);
  }

  async getAllCategories() {
    return await this.categories.find();
  }

  async createCategories() {
    return await this.categories.create({ category: drugClasses });
  }
}
