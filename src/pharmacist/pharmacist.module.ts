import { Module } from '@nestjs/common';
import { PharmacistService } from './services/pharmacist.service';
import { PharmacistController } from './controllers/pharmacist.controller';
import { Pharmacist, PharmacistSchema } from './schema/pharmacist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalModule } from 'src/hospital/hospital.module';
import { PharmacistDao } from './dao/pharmacist.dao';
import { PharmacistGuard } from './guards/pharmacist.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacist.name, schema: PharmacistSchema },
    ]),
    HospitalModule,
  ],
  providers: [PharmacistService, PharmacistDao, PharmacistGuard],
  controllers: [PharmacistController],
  exports: [PharmacistDao, PharmacistGuard, PharmacistService],
})
export class PharmacistModule {}
