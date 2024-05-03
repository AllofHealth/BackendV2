import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URI } from './shared/constants';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { PatientModule } from './patient/patient.module';
import { AdminModule } from './admin/admin.module';
import { HospitalModule } from './hospital/hospital.module';
import { DoctorModule } from './doctor/doctor.module';
import { PharmacistModule } from './pharmacist/pharmacist.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 1,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MongooseModule.forRoot(MONGODB_URI, {
      dbName: 'Pharmalink',
    }),
    MyLoggerModule,
    PatientModule,
    AdminModule,
    HospitalModule,
    DoctorModule,
    PharmacistModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
