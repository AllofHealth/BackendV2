import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Admin } from '../schema/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  AuthenticateAdminInterface,
  CreateAdminType,
  RemoveAdminType,
  UpdateAdminProfileType,
} from '../interface/admin.interface';
import { Model, MongooseError, Types } from 'mongoose';
import { AdminError, ApprovalStatus, ErrorCodes } from '@/shared';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import { AdminDao } from '../dao/admin.dao';
import { AdminGuard } from '../guards/admin.guard';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { OtpService } from '@/modules/otp/services/otp.service';

@Injectable()
export class AdminService {
  private logger: MyLoggerService = new MyLoggerService('AdminService');
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly adminDao: AdminDao,
    private readonly adminGuard: AdminGuard,
    private readonly hospitalDao: HospitalDao,
    private readonly doctorDao: DoctorDao,
    private readonly pharmacistDao: PharmacistDao,
    private readonly otpService: OtpService,
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

  async isAdminAuthenticated(walletAddress: string) {
    let isAuthenticated = false;
    try {
      const admin = await this.adminDao.fetchAdminByAddress(walletAddress);
      if (!admin) {
        return {
          success: ErrorCodes.NotFound,
          message: 'Admin not found',
        };
      }
      if (admin.isAuthenticated) {
        isAuthenticated = true;
      }

      return isAuthenticated;
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        { message: 'An error occurred while fetching admin' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async fetchAllAdmins() {
    return await this.adminModel.find();
  }

  async authenticateAdmin(args: AuthenticateAdminInterface) {
    const { addressToAuthenticate, blockchainId } = args;
    try {
      const admin = await this.adminDao.fetchAdminByAddress(
        addressToAuthenticate,
      );
      if (!admin) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'admin not found',
        };
      }

      admin.isAuthenticated = true;
      admin.id = blockchainId;
      await admin.save();

      return {
        success: HttpStatus.OK,
        message: 'admin successfully authenticated',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createNewAdmin(args: CreateAdminType) {
    if (await this.adminDao.validateAdminExists(args.walletAddress)) {
      return {
        success: HttpStatus.CREATED,
        message: 'admin already exists',
      };
    }

    try {
      const admin = await this.adminDao.createAdmin(args);
      try {
        await this.otpService.deliverOtp(
          args.walletAddress,
          args.email,
          'admin',
        );
      } catch (error) {
        await this.adminDao.removeAdminByAddress(args.walletAddress);
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'An error occurred while creating an admin',
        };
      }
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
    const { adminAddressToRemove } = args;

    if (!(await this.adminGuard.validateAdmin(adminAddressToRemove))) {
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
  }): Promise<{ success: number; message: string }> {
    const { hospitalId } = args;
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

  async fetchAllPractitioners() {
    try {
      const allDoctors = await this.doctorDao.fetchAllDoctors();
      const allPharmacists = await this.pharmacistDao.fetchAllPharmacists();
      const fullList: (any | any)[] = [...allDoctors, ...allPharmacists];

      if (fullList.length === 0) {
        return {
          success: HttpStatus.FOUND,
          allPractitioners: [],
        };
      }

      return {
        success: HttpStatus.OK,
        allPractitioners: fullList,
      };
    } catch (error) {
      console.error(error);
      throw new AdminError('Error fetching practitioners');
    }
  }
}
