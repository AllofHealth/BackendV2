import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URI } from './shared/constants';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './modules/my-logger/my-logger.module';
import { PatientModule } from './modules/patient/patient.module';
import { AdminModule } from './modules/admin/admin.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PharmacistModule } from './modules/pharmacist/pharmacist.module';
import { OtpModule } from './modules/otp/otp.module';
import { TermillModule } from './modules/termill/termill.module';
import { PostmarkModule } from './modules/postmark/postmark.module';

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
    OtpModule,
    TermillModule,
    PostmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
