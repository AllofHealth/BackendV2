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
import { HospitalModule } from '@/modules/hospital/hospital.module';
import { PharmacistDao } from './dao/pharmacist.dao';
import { PharmacistGuard } from './guards/pharmacist.guard';
import { PatientModule } from '@/modules/patient/patient.module';
import { OtpModule } from '../otp/otp.module';

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
    forwardRef(() => OtpModule),
  ],
  providers: [PharmacistService, PharmacistDao, PharmacistGuard],
  controllers: [PharmacistController],
  exports: [PharmacistDao, PharmacistGuard, PharmacistService],
})
export class PharmacistModule {}
