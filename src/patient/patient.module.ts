import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';
import {
  FamilyMember,
  FamilyMemberSchema,
  Patient,
  PatientSchema,
} from './schemas/patient.schema';
import { PatientDao } from './dao/patient.dao';
import { PatientGuard } from './guards/patient.guard';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    MongooseModule.forFeature([
      {
        name: FamilyMember.name,
        schema: FamilyMemberSchema,
      },
    ]),
  ],
  providers: [PatientService, PatientDao, PatientGuard],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
