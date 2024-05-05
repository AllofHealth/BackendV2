import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { AdminSchema, Admin } from './schema/admin.schema';
import { AdminDao } from './dao/admin.dao';
import { AdminGuard } from './guards/admin.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalModule } from 'src/hospital/hospital.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    HospitalModule,
  ],
  providers: [AdminService, AdminDao, AdminGuard],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
