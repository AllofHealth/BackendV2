import { forwardRef, Module } from '@nestjs/common';
import { HospitalService } from './services/hospital.service';
import { HospitalController } from './controllers/hospital.controller';
import { Hospital, HospitalSchema } from './schema/hospital.schema';
import { HospitalDao } from './dao/hospital.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalGuard } from './guard/hospital.guard';
import { DoctorModule } from '@/modules/doctor/doctor.module';
import { PharmacistModule } from '@/modules/pharmacist/pharmacist.module';
import { EncryptionModule } from '@/shared/utils/encryption/encryption.module';
import { HospitalApprovedGuard } from './guard/hospital.approved.guard';
import { HospitalAuthGuard } from './guard/hospital.auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
    ]),
    DoctorModule,
    forwardRef(() => PharmacistModule),
    EncryptionModule,
  ],
  providers: [
    HospitalService,
    HospitalDao,
    HospitalGuard,
    HospitalApprovedGuard,
    HospitalAuthGuard,
  ],
  controllers: [HospitalController],
  exports: [HospitalService, HospitalDao, HospitalGuard, HospitalApprovedGuard],
})
export class HospitalModule {}
