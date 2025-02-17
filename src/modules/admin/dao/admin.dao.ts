import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../schema/admin.schema';
import { Model } from 'mongoose';
import { PROFILE_PLACEHOLDER } from '@/shared/constants';
import { AdminError, Category } from '@/shared';
import {
  CreateAdminType,
  UpdateAdminProfileType,
} from '../interface/admin.interface';

export class AdminDao {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async createAdmin(admin: CreateAdminType) {
    return await this.adminModel.create({
      name: admin.name,
      profilePicture: admin.profilePicture
        ? admin.profilePicture
        : PROFILE_PLACEHOLDER,
      email: admin.email,
      walletAddress: admin.walletAddress,
      category: Category.Admin,
    });
  }

  async removeAdminByAddress(walletAddress: string) {
    return await this.adminModel.deleteOne({ walletAddress });
  }

  async validateAdminExists(address: string): Promise<boolean> {
    let adminExists: boolean = false;
    try {
      const admin = await this.adminModel.findOne({ walletAddress: address });

      if (admin) {
        adminExists = true;
      }

      return adminExists;
    } catch (error) {
      throw new AdminError('Error validating admin exists');
    }
  }

  async fetchAdminByAddress(walletAddress: string) {
    return await this.adminModel.findOne({ walletAddress });
  }

  async fetchAllAdmins() {
    return await this.adminModel.find();
  }

  async updateAdmin(address: string, updateData: UpdateAdminProfileType) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    return await this.adminModel.updateOne(
      { walletAddress: address },
      { $set: updates },
      { new: true, runValidators: true },
    );
  }
}
