import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from '../schema/otp.schema';
import { Model } from 'mongoose';

@Injectable()
export class OtpDao {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  async createOtp(walletAddress: string, otp: string, expirationTime: Date) {
    return await this.otpModel.create({
      walletAddress,
      otp,
      expirationTime,
    });
  }

  async deleteOtp(walletAddress: string) {
    return await this.otpModel.deleteOne({ walletAddress });
  }

  async findOtp(walletAddress: string) {
    return await this.otpModel.findOne({ walletAddress });
  }
}
