import { Module } from '@nestjs/common';
import { HospitalService } from './services/hospital.service';
import { HospitalController } from './controllers/hospital.controller';
import { HospitalSchema, Hospital } from './schema/hospital.schema';
import { HospitalDao } from './dao/hospital.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalGuard } from './guard/hospital.guard';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PharmacistModule } from 'src/pharmacist/pharmacist.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
    ]),
    DoctorModule,
    PharmacistModule,
  ],
  providers: [HospitalService, HospitalDao, HospitalGuard],
  controllers: [HospitalController],
  exports: [HospitalService, HospitalDao],
})
export class HospitalModule {}
