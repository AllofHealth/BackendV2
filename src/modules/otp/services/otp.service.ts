import { HttpStatus, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { OtpDao } from '../dao/otp.dao';
import { PostmarkService } from '@/modules/postmark/service/postmark.service';

@Injectable()
export class OtpService {
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

  async generateOtp(secret: string) {
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

  async verifyUser(walletAddress: string) {
    try {
      const role = await this.otpDao.determineRole(walletAddress);

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
      }
    } catch (error) {
      console.error(error);
      throw new Error('error while verifying user');
    }
  }

  async verifyOtp(secret: string, otp: string) {
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
        await this.verifyUser(entry.walletAddress);
      } catch (error) {
        console.error(error);
        await this.verifyUser(entry.walletAddress);
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

  async deliverOtp(walletAddress: string, emailAddress: string) {
    try {
      const { otp } = await this.generateOtp(walletAddress);
      console.log(otp);
      await this.postmarkService.sendEmail({
        to: emailAddress,
        otp,
      });
      console.log('otp sent successfully');
    } catch (error) {
      console.error(error);
      throw new Error('an error occurred while delivering otp');
    }
  }

  async resendOtp(walletAddress: string) {
    await this.cleanUp(walletAddress);
    try {
      const role = await this.otpDao.determineRole(walletAddress);

      switch (role) {
        case 'patient':
          const patient = await this.otpDao.fetchPatient(walletAddress);
          await this.deliverOtp(walletAddress, patient.email);
          break;
        case 'doctor':
          const doctor = await this.otpDao.fetchDoctor(walletAddress);
          await this.deliverOtp(walletAddress, doctor.email);
          break;
        case 'pharmacist':
          const pharmacist = await this.otpDao.fetchPharmacist(walletAddress);
          await this.deliverOtp(walletAddress, pharmacist.email);
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
