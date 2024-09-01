import { Module } from '@nestjs/common';
import { MedicineDao } from './dao/medicine.dao';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Medication,
  MedicineCategories,
  MedicineCategoriesSchema,
  MedicineSchema,
  Receipt,
  ReceiptSchema,
} from './schema/medicine.schema';
import { MedicineService } from './service/medicine.service';
import { MedicineController } from './controller/medicine.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medication.name, schema: MedicineSchema },
    ]),
    MongooseModule.forFeature([{ name: Receipt.name, schema: ReceiptSchema }]),
    MongooseModule.forFeature([
      { name: Medication.name, schema: MedicineSchema },
    ]),
    MongooseModule.forFeature([
      { name: MedicineCategories.name, schema: MedicineCategoriesSchema },
    ]),
  ],
  providers: [MedicineDao, MedicineService],
  exports: [MedicineDao, MedicineService],
  controllers: [MedicineController],
})
export class MedicineModule {}
