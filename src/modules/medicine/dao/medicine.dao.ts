import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Medicine } from '../schema/medicine.schema';
import { Model } from 'mongoose';
import { CreateMedicineInterface } from '../interface/medicine.interface';

@Injectable()
export class MedicineDao {
  constructor(
    @InjectModel(Medicine.name) private readonly medicine: Model<Medicine>,
  ) {}

  async createMedicine(args: CreateMedicineInterface) {
    return await this.medicine.create(args);
  }
}
