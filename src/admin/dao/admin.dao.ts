import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../schema/admin.schema';
import { Model } from 'mongoose';
import { PROFILE_PLACEHOLDER } from 'src/shared/constants';
import { AdminError, Category } from 'src/shared';
import { CreateAdminType } from '../interface/admin.interface';

export class AdminDao {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}
  async updateAdmin(admin: CreateAdminType) {
    return await this.adminModel.create({
      id: admin.id,
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
}
