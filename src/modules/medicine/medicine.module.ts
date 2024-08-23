import { Module } from '@nestjs/common';
import { MedicineDao } from './dao/medicine.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicine, MedicineSchema } from './schema/medicine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
    ]),
  ],
  providers: [MedicineDao],
  exports: [MedicineDao],
})
export class MedicineModule {}
