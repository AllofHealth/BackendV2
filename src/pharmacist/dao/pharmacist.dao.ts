import { InjectModel } from '@nestjs/mongoose';
import { Pharmacist } from '../schema/pharmacist.schema';
import { Model } from 'mongoose';
import {
  CreatePharmacistType,
  UpdatePharmacistType,
} from '../interface/pharmacist.interface';
import { PROFILE_PLACEHOLDER } from 'src/shared/constants';
import { ApprovalStatus } from 'src/shared';
import { encrypt } from 'src/shared/utils/encrypt.utils';

export class PharmacistDao {
  constructor(
    @InjectModel(Pharmacist.name)
    private readonly pharmacistModel: Model<Pharmacist>,
  ) {}
  async createNewPharmacist(pharmacist: CreatePharmacistType) {
    return await this.pharmacistModel.create({
      id: pharmacist.id,
      name: pharmacist.name,
      email: pharmacist.email,
      profilePicture: pharmacist.profilePicture
        ? pharmacist.profilePicture
        : PROFILE_PLACEHOLDER,
      location: pharmacist.location,
      phoneNumber: pharmacist.phoneNumber,
      walletAddress: pharmacist.walletAddress,
      regNo: encrypt({ data: pharmacist.regNo }),
      status: ApprovalStatus.Pending,
    });
  }

  async fetchPharmacist(id: number) {
    return await this.pharmacistModel.findOne({ id });
  }

  async fetchPharmacistByAddress(address: string) {
    return await this.pharmacistModel.findOne({ walletAddress: address });
  }

  async fetchAllPharmacists() {
    return await this.pharmacistModel.find();
  }

  async fetchPharmacistWithPendingStatus() {
    return await this.pharmacistModel.find({ status: ApprovalStatus.Pending });
  }

  async fetchPharmacistsWithApprovedStatus() {
    return await this.pharmacistModel.find({ status: ApprovalStatus.Approved });
  }

  async updatePharmacist(address: string, updateData: UpdatePharmacistType) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    const result = await this.pharmacistModel.findOneAndUpdate(
      { walletAddress: address },
      { $set: updates },
      { new: true, runValidators: true },
    );

    console.log('Update result:', result);
    return result;
  }

  async removePharmacist(address: string) {
    return await this.pharmacistModel.deleteOne({ walletAddress: address });
  }
}
