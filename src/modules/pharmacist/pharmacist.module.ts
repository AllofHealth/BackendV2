import { Module, forwardRef } from '@nestjs/common';
import { PharmacistService } from './services/pharmacist.service';
import { PharmacistController } from './controllers/pharmacist.controller';
import {
  Inventory,
  InventorySchema,
  Medicine,
  MedicineSchema,
  Pharmacist,
  PharmacistSchema,
} from './schema/pharmacist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalModule } from 'src/modules/hospital/hospital.module';
import { PharmacistDao } from './dao/pharmacist.dao';
import { PharmacistGuard } from './guards/pharmacist.guard';
import { PatientModule } from 'src/modules/patient/patient.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacist.name, schema: PharmacistSchema },
    ]),
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
    ]),
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
    forwardRef(() => HospitalModule),
    forwardRef(() => PatientModule),
  ],
  providers: [PharmacistService, PharmacistDao, PharmacistGuard],
  controllers: [PharmacistController],
  exports: [PharmacistDao, PharmacistGuard, PharmacistService],
})
export class PharmacistModule {}
