import { Module } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { PatientDao } from './dao/patient.dao';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  providers: [PatientService, PatientDao],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
