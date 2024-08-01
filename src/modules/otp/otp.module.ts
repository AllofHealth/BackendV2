import { Module } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { OtpController } from './controller/otp/otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schema/otp.schema';
import { OtpDao } from './dao/otp.dao';

@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])],
  providers: [OtpService, OtpDao],
  controllers: [OtpController],
  exports: [OtpService, OtpDao],
})
export class OtpModule {}
