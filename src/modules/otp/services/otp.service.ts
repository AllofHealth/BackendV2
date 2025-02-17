import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { OtpDao } from '../dao/otp.dao';
import { PostmarkService } from '@/modules/postmark/service/postmark.service';
import { RoleType } from '../interface/otp.interface';
import { EntityCreatedDto } from '@/shared/dto/shared.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { SharedEvents } from '@/shared/events/shared.events';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';

@Injectable()
export class OtpService {
  private readonly logger = new MyLoggerService(OtpService.name);
  private readonly expirationTime = 1000 * 60 * 5; //5 minutes

  constructor(
    private readonly otpDao: OtpDao,
    private readonly postmarkService: PostmarkService,
  ) {}

  private async cleanUp(secret: string) {
    try {
      await this.otpDao.deleteOtp(secret);
    } catch (error) {
      console.error(error);
      throw new Error('error while cleaning up otp');
    }
  }

  async generateOtp(secret: string, role: RoleType) {
    const otp = authenticator.generate(secret);
    const expiresAt = Date.now() + this.expirationTime;
    try {
      await this.cleanUp(secret);

      if (!otp) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'otp not generated',
        };
      }
      const result = await this.otpDao.createOtp(
        secret,
        otp,
        new Date(expiresAt),
        role,
      );
      if (!result) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'otp not created',
        };
      }

      return {
        success: HttpStatus.OK,
        otp,
        expiresAt,
        message: 'otp created',
      };
    } catch (error) {
      console.error(error);
      throw new Error('error while generating otp');
    }
  }

  async verifyUser(walletAddress: string, role: RoleType) {
    try {
      switch (role) {
        case 'patient':
          const patient = await this.otpDao.fetchPatient(walletAddress);
          patient.isVerified = true;
          await patient.save();
          break;
        case 'doctor':
          const doctor = await this.otpDao.fetchDoctor(walletAddress);
          doctor.isVerified = true;
          await doctor.save();
          break;
        case 'pharmacist':
          const pharmacist = await this.otpDao.fetchPharmacist(walletAddress);
          pharmacist.isVerified = true;
          await pharmacist.save();
          break;

        case 'institution':
          const institution = await this.otpDao.fetchInstitution(walletAddress);
          institution.isVerified = true;
          await institution.save();
          break;
        case 'admin':
          const admin = await this.otpDao.fetchAdmin(walletAddress);
          admin.isVerified = true;
          await admin.save();
          break;
      }
    } catch (error) {
      console.error(error);
      throw new Error('error while verifying user');
    }
  }

  async verifyOtp(secret: string, otp: string, role: RoleType) {
    let isValid: boolean = false;
    try {
      const entry = await this.otpDao.findOtp(secret);
      if (!entry) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'no entry',
        };
      }

      if (new Date(Date.now()) > entry.expirationTime) {
        await this.otpDao.deleteOtp(secret);
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'otp expired',
        };
      }

      if (entry.otp === otp) {
        isValid = true;
      }
      if (!isValid) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'otp invalid',
        };
      }
      await this.otpDao.deleteOtp(secret);
      try {
        await this.verifyUser(entry.walletAddress, role);
      } catch (error) {
        console.error(error);
        await this.verifyUser(entry.walletAddress, role);
      }
      return {
        success: HttpStatus.OK,
        message: 'otp verified',
        isValid,
      };
    } catch (error) {
      console.error(error);
      throw new Error('error while verifying otp');
    }
  }

  @OnEvent(SharedEvents.ENTITY_CREATED, { async: true })
  async deliverOtp(args: EntityCreatedDto) {
    const { walletAddress, email, role } = args;
    try {
      this.logger.log(`generating otp`);
      const { otp } = await this.generateOtp(walletAddress, role);

      this.logger.log(`delivering email to ${email}`);
      await this.postmarkService.sendEmail({
        to: email,
        otp,
      });

      this.logger.log(`otp delivered successfully`);
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        'an error occurred while delivering otp',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resendOtp(walletAddress: string, role: RoleType) {
    await this.cleanUp(walletAddress);
    try {
      switch (role) {
        case 'patient':
          const patient = await this.otpDao.fetchPatient(walletAddress);
          await this.deliverOtp({
            walletAddress,
            email: patient.email,
            role: 'patient',
          });
          break;
        case 'doctor':
          const doctor = await this.otpDao.fetchDoctor(walletAddress);
          await this.deliverOtp({
            walletAddress,
            email: doctor.email,
            role: 'doctor',
          });
          break;
        case 'pharmacist':
          const pharmacist = await this.otpDao.fetchPharmacist(walletAddress);
          await this.deliverOtp({
            walletAddress,
            email: pharmacist.email,
            role: 'pharmacist',
          });
          break;

        case 'institution':
          const institution = await this.otpDao.fetchInstitution(walletAddress);
          await this.deliverOtp({
            walletAddress,
            email: institution.admin,
            role: 'institution',
          });
          break;
      }

      return {
        success: HttpStatus.OK,
        message: 'otp resent successfully',
      };
    } catch (error) {
      console.error(error);
      throw new Error('an error occurred while resending otp');
    }
  }
}
