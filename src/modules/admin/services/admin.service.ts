import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Admin } from '../schema/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  AuthenticateAdminInterface,
  CreateAdminType,
  RemoveAdminType,
  UpdateAdminProfileType,
} from '../interface/admin.interface';
import { Model, Types } from 'mongoose';
import { ApprovalStatus, ErrorCodes } from '@/shared';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import { AdminDao } from '../dao/admin.dao';
import { AdminGuard } from '../guards/admin.guard';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { OtpService } from '@/modules/otp/services/otp.service';
import { AdminErrors, AdminMessages } from '@/modules/admin/data/admin.data';

@Injectable()
export class AdminService {
  private logger: MyLoggerService = new MyLoggerService(AdminService.name);

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
          message: AdminErrors.NOT_FOUND,
        };
      }
      return admin;
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.FETCHING_ADMIN },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isAdminAuthenticated(walletAddress: string) {
    let isAuthenticated = false;
    try {
      const admin = await this.adminDao.fetchAdminByAddress(walletAddress);
      if (!admin) {
        return {
          success: ErrorCodes.NotFound,
          message: AdminErrors.NOT_FOUND,
        };
      }
      if (admin.isAuthenticated) {
        isAuthenticated = true;
      }

      return isAuthenticated;
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.AUTH_CHECK_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllAdmins() {
    try {
      const admins = await this.adminModel.find();
      if (!admins) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: AdminErrors.NOT_FOUND,
          data: [],
        };
      }

      return {
        success: HttpStatus.OK,
        data: admins,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.FETCHING_ADMIN },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
          message: AdminErrors.NOT_FOUND,
        };
      }

      admin.isAuthenticated = true;
      admin.id = blockchainId;
      await admin.save();

      return {
        success: HttpStatus.OK,
        message: AdminMessages.AUTH_SUCCESSFUL,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.AUTH_ERROR },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createNewAdmin(args: CreateAdminType) {
    if (await this.adminDao.validateAdminExists(args.walletAddress)) {
      return {
        success: HttpStatus.CONFLICT,
        message: AdminErrors.ADMIN_EXIST,
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
      } catch (e) {
        this.logger.error(e.message);
        await this.adminDao.removeAdminByAddress(args.walletAddress);
        return {
          success: HttpStatus.BAD_REQUEST,
          message: AdminErrors.CREATE_ADMIN,
        };
      }
      return {
        success: HttpStatus.OK,
        message: AdminMessages.CREATE_ADMIN,
        admin,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.CREATE_ADMIN },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeAdmin(args: RemoveAdminType) {
    const { adminAddressToRemove } = args;

    if (!(await this.adminGuard.validateAdmin(adminAddressToRemove))) {
      return {
        success: HttpStatus.UNAUTHORIZED,
      };
    }

    try {
      await this.adminDao.removeAdminByAddress(adminAddressToRemove);
      return {
        success: ErrorCodes.Success,
        message: AdminMessages.ADMIN_REMOVED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.ADMIN_REMOVED_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
          message: AdminErrors.HOSPITAL_NOT_FOUND,
        };
      }

      switch (hospital.status) {
        case ApprovalStatus.Approved:
          return {
            success: HttpStatus.CONFLICT,
            message: AdminErrors.HOSPITAL_APPROVED_ALREADY,
          };

        case ApprovalStatus.Pending:
          hospital.status = ApprovalStatus.Approved;

          await hospital.save();
          break;

        default:
          return {
            success: HttpStatus.BAD_REQUEST,
            message: AdminErrors.INVALID_STATUS,
          };
      }

      return {
        success: HttpStatus.OK,
        message: AdminMessages.HOSPITAL_APPROVED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.HOSPITAL_APPROVE_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateAdmin(args: {
    walletAddress: string;
    data: UpdateAdminProfileType;
  }) {
    const { walletAddress, data } = args;
    try {
      await this.adminDao.updateAdmin(walletAddress, data);

      return {
        success: HttpStatus.OK,
        message: AdminMessages.ADMIN_UPDATED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.ADMIN_UPDATE_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async editAdmin(args: { walletAddress: string; replaceAddress: string }) {
  //   try {
  //     const admin = await this.adminDao.fetchAdminByAddress(args.walletAddress);
  //     admin.walletAddress = args.replaceAddress;
  //     admin.isVerified = true;
  //     await admin.save();
  //     return {
  //       success: HttpStatus.OK,
  //       message: 'modification completed',
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException(
  //       'an error occurred while editing admin',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

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
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: AdminErrors.FETCHING_PRACTITIONERS },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
