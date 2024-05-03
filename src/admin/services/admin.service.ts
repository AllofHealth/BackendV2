import { Injectable } from '@nestjs/common';
import { Admin } from '../schema/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminType, RemoveAdminType } from '../interface/admin.interface';
import { Model } from 'mongoose';
import { AdminError, ErrorCodes } from 'src/shared/global';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { AdminDao } from '../dao/admin.dao';

@Injectable()
export class AdminService {
  private logger: MyLoggerService = new MyLoggerService('AdminService');
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly adminDao: AdminDao,
  ) {}

  async fetchAdminByAddress(walletAddress: string) {
    return await this.adminModel.findOne({ walletAddress });
  }

  async fetchAllAdmins() {
    return await this.adminModel.find();
  }

  async createNewAdmin(args: CreateAdminType) {
    const requiredParams = ['id', 'name', 'email', 'walletAddress'];

    if (
      !requiredParams.every((param) => args[param as keyof CreateAdminType])
    ) {
      throw new AdminError('Required parameters missing');
    }

    if (await this.adminDao.validateAdminExists(args.walletAddress)) {
      throw new AdminError('Admin already exists');
    }

    try {
      const admin = await this.adminDao.updateAdmin(args);
      return {
        success: ErrorCodes.Success,
        admin,
        message: 'admin created successfully',
      };
    } catch (error) {
      this.logger.info('Error creating admin');
      throw new AdminError('Error creating admin');
    }
  }

  async removeAdmin(
    args: RemoveAdminType,
  ): Promise<{ success: number; message: string }> {
    const { adminAddressToAuthorize, adminAddressToRemove } = args;

    if (
      !adminAddressToAuthorize ||
      adminAddressToAuthorize.length !== 42 ||
      !adminAddressToRemove ||
      adminAddressToRemove.length !== 42
    ) {
      throw new AdminError('Invalid admin address');
    }

    if (
      !(await this.adminDao.validateAdminExists(adminAddressToAuthorize)) ||
      !(await this.adminDao.validateAdminExists(adminAddressToRemove))
    ) {
      throw new AdminError('Not authorized');
    }

    try {
      await this.adminDao.removeAdminByAddress(adminAddressToRemove);
      return {
        success: ErrorCodes.Success,
        message: 'admin removed successfully',
      };
    } catch (error) {
      this.logger.info('Error removing admin');
      throw new AdminError('Error removing admin');
    }
  }
}
