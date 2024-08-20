import { forwardRef, Module } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { OtpController } from './controller/otp/otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schema/otp.schema';
import { OtpDao } from './dao/otp.dao';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { PharmacistModule } from '../pharmacist/pharmacist.module';
import { PostmarkModule } from '../postmark/postmark.module';
import { HospitalModule } from '../hospital/hospital.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    forwardRef(() => PatientModule),
    forwardRef(() => DoctorModule),
    forwardRef(() => PharmacistModule),
    forwardRef(() => HospitalModule),
    forwardRef(() => AdminModule),
    PostmarkModule,
  ],
  providers: [OtpService, OtpDao],
  controllers: [OtpController],
  exports: [OtpService, OtpDao],
})
export class OtpModule {}
