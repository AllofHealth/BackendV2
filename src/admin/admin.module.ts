import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { AdminSchema, Admin } from './schema/admin.schema';
import { AdminDao } from './dao/admin.dao';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [AdminService, AdminDao],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
