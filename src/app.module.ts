import config from '@/shared/config/config';
import { ConfigifyModule } from '@itgorillaz/configify';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { MyLoggerModule } from './modules/my-logger/my-logger.module';
import { OtpModule } from './modules/otp/otp.module';
import { PatientModule } from './modules/patient/patient.module';
import { PharmacistModule } from './modules/pharmacist/pharmacist.module';
import { PostmarkModule } from './modules/postmark/postmark.module';
import { TermillModule } from './modules/termill/termill.module';
import { EncryptionModule } from './shared/utils/encryption/encryption.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    ConfigifyModule.forRootAsync(),
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database.mongodb_uri'),
        dbName: config.get('database.dbName'),
      }),
      inject: [ConfigService],
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
    EncryptionModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
