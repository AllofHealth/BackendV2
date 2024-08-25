import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { AdminSchema, Admin } from './schema/admin.schema';
import { AdminDao } from './dao/admin.dao';
import { AdminGuard } from './guards/admin.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalModule } from '@/modules/hospital/hospital.module';
import { DoctorModule } from '@/modules/doctor/doctor.module';
import { PharmacistModule } from '@/modules/pharmacist/pharmacist.module';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    forwardRef(() => HospitalModule),
    forwardRef(() => DoctorModule),
    forwardRef(() => PharmacistModule),
    forwardRef(() => OtpModule),
  ],
  providers: [AdminService, AdminDao, AdminGuard],
  controllers: [AdminController],
  exports: [AdminService, AdminDao],
})
export class AdminModule {}
