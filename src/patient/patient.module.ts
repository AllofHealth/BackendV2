import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';
import {
  FamilyMember,
  FamilyMemberSchema,
  Patient,
  PatientSchema,
  Prescriptions,
  PrescriptionsSchema,
} from './schemas/patient.schema';
import { PatientDao } from './dao/patient.dao';
import { PatientGuard } from './guards/patient.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacistModule } from 'src/pharmacist/pharmacist.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import {
  Approval,
  ApprovalSchema,
  Doctor,
  DoctorSchema,
} from 'src/doctor/schema/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    MongooseModule.forFeature([
      {
        name: FamilyMember.name,
        schema: FamilyMemberSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: Prescriptions.name, schema: PrescriptionsSchema },
    ]),
    MongooseModule.forFeature([
      { name: Approval.name, schema: ApprovalSchema },
    ]),
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    PharmacistModule,
    DoctorModule,
  ],
  providers: [PatientService, PatientDao, PatientGuard],
  controllers: [PatientController],
  exports: [PatientService, PatientDao, PatientGuard],
})
export class PatientModule {}
