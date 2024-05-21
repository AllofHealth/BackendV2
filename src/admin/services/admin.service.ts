import { HttpStatus, Injectable } from '@nestjs/common';
import { Admin } from '../schema/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateAdminType,
  RemoveAdminType,
  UpdateAdminProfileType,
} from '../interface/admin.interface';
import { Model, MongooseError, Types } from 'mongoose';
import { AdminError, ApprovalStatus, ErrorCodes } from 'src/shared';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { AdminDao } from '../dao/admin.dao';
import { AdminGuard } from '../guards/admin.guard';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';

@Injectable()
export class AdminService {
  private logger: MyLoggerService = new MyLoggerService('AdminService');
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly adminDao: AdminDao,
    private readonly adminGuard: AdminGuard,
    private readonly hospitalDao: HospitalDao,
  ) {}

  async fetchAdminByAddress(walletAddress: string) {
    try {
      const admin = await this.adminDao.fetchAdminByAddress(walletAddress);
      if (!admin) {
        return {
          success: ErrorCodes.NotFound,
          message: 'Admin not found',
        };
      }
      return admin;
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new Error('An error occurred while fetching admin');
    }
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
      return {
        success: HttpStatus.CREATED,
        message: 'admin already exists',
      };
    }

    try {
      const admin = await this.adminDao.createAdmin(args);
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

  async removeAdmin(args: RemoveAdminType) {
    const { adminAddressToAuthorize, adminAddressToRemove } = args;

    if (
      !(await this.adminGuard.validateAdmin(adminAddressToAuthorize)) ||
      !(await this.adminGuard.validateAdmin(adminAddressToRemove))
    ) {
      return {
        success: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      };
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

  async approveHospital(args: {
    hospitalId: Types.ObjectId;
    adminAddress: string;
  }): Promise<{ success: number; message: string }> {
    const { hospitalId, adminAddress } = args;

    if (!(await this.adminGuard.validateAdmin(adminAddress))) {
      return {
        success: HttpStatus.UNAUTHORIZED,
        message: 'not authorized',
      };
    }

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      if (!hospital) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Hospital not found',
        };
      }

      switch (hospital.status) {
        case ApprovalStatus.Approved:
          return {
            success: HttpStatus.CREATED,
            message: 'hospital already approved',
          };

        case ApprovalStatus.Pending:
          hospital.status = ApprovalStatus.Approved;

          await hospital.save();
          break;

        default:
          return {
            success: HttpStatus.BAD_REQUEST,
            message: 'hospital status is invalid',
          };
      }

      return {
        success: ErrorCodes.Success,
        message: 'Hospital approved successfully',
      };
    } catch (error) {
      console.error(error);
      throw new AdminError('Error approving hospital');
    }
  }

  async updateAdmin(args: {
    walletAddress: string;
    data: UpdateAdminProfileType;
  }) {
    const { walletAddress, data } = args;
    try {
      const isAdmin = await this.adminGuard.validateAdmin(walletAddress);
      if (!isAdmin) {
        return {
          success: HttpStatus.UNAUTHORIZED,
          message: 'not authorized',
        };
      }
      await this.adminDao.updateAdmin(walletAddress, data);

      return {
        success: HttpStatus.OK,
        message: 'Admin updated successfully',
      };
    } catch (error) {
      console.error(error);
      throw new AdminError('Error updating admin');
    }
  }
}
