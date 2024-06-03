import { Module, forwardRef } from '@nestjs/common';
import { DoctorService } from './services/doctor.service';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorDao } from './dao/doctor.dao';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Approval,
  ApprovalSchema,
  Doctor,
  DoctorSchema,
} from './schema/doctor.schema';
import { DoctorGuard } from './guards/doctor.guard';
import { HospitalModule } from 'src/hospital/hospital.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    MongooseModule.forFeature([
      { name: Approval.name, schema: ApprovalSchema },
    ]),
    forwardRef(() => HospitalModule),
    forwardRef(() => PatientModule),
  ],
  providers: [DoctorService, DoctorDao, DoctorGuard],
  controllers: [DoctorController],
  exports: [DoctorService, DoctorDao, DoctorGuard],
})
export class DoctorModule {}
