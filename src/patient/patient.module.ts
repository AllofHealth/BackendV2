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
    PharmacistModule,
  ],
  providers: [PatientService, PatientDao, PatientGuard],
  controllers: [PatientController],
  exports: [PatientService, PatientDao, PatientGuard],
})
export class PatientModule {}
