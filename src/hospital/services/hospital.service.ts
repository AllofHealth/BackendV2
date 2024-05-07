import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Hospital } from '../schema/hospital.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError, Types } from 'mongoose';
import { HospitalGuard } from '../guard/hospital.guard';
import {
  CreateHospitalType,
  HospitalType,
  PreviewType,
} from '../interface/hospital.interface';
import { ApprovalStatus, ErrorCodes, HospitalError } from 'src/shared';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { HospitalDao } from '../dao/hospital.dao';
import { decrypt } from 'src/shared/utils/encrypt.utils';

/**
 * TODO: implement approval functions for doctors and pharmacists
 * TODO: implement hospital profile update functions
 * TODO: Implement join hospital function
 */

@Injectable()
export class HospitalService {
  private logger: MyLoggerService = new MyLoggerService('HospitalService');
  constructor(
    @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
    private readonly hospitalDao: HospitalDao,
    private readonly hospitalGuard: HospitalGuard,
  ) {}

  async createNewHospital(args: CreateHospitalType) {
    const requiredParams = [
      'id',
      'name',
      'admin',
      'email',
      'phoneNo',
      'regNo',
      'location',
    ];

    if (
      !requiredParams.every((param) => args[param as keyof CreateHospitalType])
    ) {
      throw new HospitalError('Invalid or missing parameters');
    }

    try {
      const hospital = await this.hospitalDao.createHospital(args);
      return {
        success: ErrorCodes.Success,
        hospital,
        message: 'Hospital created successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new HospitalError(error.message);
      throw new InternalServerErrorException('Error creating hospital');
    }
  }

  async returnDoctorFromHospital(
    hospital: HospitalType,
    walletAddress: string,
  ): Promise<PreviewType | undefined> {
    try {
      const Doctor = hospital.doctors.find((d: PreviewType) => {
        return d.walletAddress === walletAddress;
      });

      if (!Doctor) {
        console.info('Doctor not found');
      }

      return Doctor;
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error finding doctor');
    }
  }

  async returnPharmacistFromHospital(
    hospital: HospitalType,
    walletAddress: string,
  ): Promise<PreviewType | undefined> {
    try {
      const pharmacists = hospital.pharmacists.find((d: PreviewType) => {
        return d.walletAddress === walletAddress;
      });
      if (!pharmacists) {
        console.info('pharmacist not found');
      }

      return pharmacists;
    } catch (error) {
      console.error(error);
      throw new HospitalError('pharmacists not found');
    }
  }

  async removeDoctorFromHospital(
    hospitalId: Types.ObjectId,
    doctorAddress: string,
  ) {
    try {
      await this.hospitalDao.pullOneDoctor(hospitalId, doctorAddress);
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error removing doctor');
    }
  }

  async removePharmacistFromHospital(
    hospitalId: Types.ObjectId,
    pharmacistAddress: string,
  ) {
    try {
      return await this.hospitalDao.pullOnePharmacist(
        hospitalId,
        pharmacistAddress,
      );
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error removing pharmacist');
    }
  }

  async delegateAdminPosition(
    newAdminAddress: string,
    adminAddress: string,
    hospitalId: Types.ObjectId,
  ): Promise<{ success: number; message: string }> {
    if (
      !newAdminAddress ||
      newAdminAddress.length !== 42 ||
      !adminAddress ||
      adminAddress.length !== 42 ||
      !hospitalId ||
      newAdminAddress === adminAddress
    ) {
      throw new Error('Missing required parameter');
    }
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      if (!hospital) {
        throw new HospitalError("Hospital doesn't exist");
      }

      if (
        !(await this.hospitalGuard.validateHospitalAdmin(
          hospital,
          adminAddress,
        ))
      ) {
        throw new HospitalError('not authorized');
      }

      const isAffiliated =
        (await this.returnDoctorFromHospital(hospital, newAdminAddress)) ||
        (await this.returnPharmacistFromHospital(hospital, newAdminAddress));
      if (
        !isAffiliated ||
        isAffiliated == undefined ||
        isAffiliated.status !== ApprovalStatus.Approved
      ) {
        throw new Error(
          'User is not affiliated with hospital or not yet approved',
        );
      }

      hospital.admin = newAdminAddress;
      await hospital.save();

      return {
        success: ErrorCodes.Success,
        message: 'Successfully delegated admin position',
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error delegating admin position');
    }
  }

  /**
   * Hospital Read operations
   */

  async fetchApprovedHospitals(): Promise<{
    success: number;
    hospitals: HospitalType[];
  }> {
    try {
      const hospitals =
        await this.hospitalDao.fetchHospitalWithApprovedStatus();
      if (!hospitals) {
        console.log('No approved hospitals');
        throw new HospitalError('No approved hospitals found');
      }
      if (hospitals.length === 0) {
        return {
          success: 404,
          hospitals: [],
        };
      }

      return {
        success: 200,
        hospitals,
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching approved hospitals');
    }
  }

  async fetchPendingHospitals(): Promise<{
    success: number;
    hospitals: HospitalType[];
  }> {
    try {
      const hospitals = await this.hospitalDao.fetchHospitalWithPendingStatus();
      if (!hospitals) {
        console.log('No approved hospitals');
        throw new HospitalError('No approved hospitals found');
      }
      if (hospitals.length === 0) {
        return {
          success: 404,
          hospitals: [],
        };
      }

      return {
        success: 200,
        hospitals,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HospitalError('Error fetching approved hospitals');
    }
  }

  async fetchAllHospitals(): Promise<{
    success: number;
    hospitals: HospitalType[];
  }> {
    try {
      const hospitals = await this.hospitalModel.find();
      if (!hospitals) {
        return {
          success: ErrorCodes.NotFound,
          hospitals: [],
        };
      }

      return {
        success: ErrorCodes.Success,
        hospitals,
      };
    } catch (error) {
      this.logger.info('Error fetching all hospitals');
      throw new HospitalError('Error fetching all hospitals');
    }
  }

  async fetchHospitalById(id: Types.ObjectId) {
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(id);
      if (!hospital) {
        return {
          success: ErrorCodes.NotFound,
          message: 'Hospital not found',
        };
      }

      const decryptedRegNo = decrypt({ data: hospital.regNo });
      const decryptedHospital = {
        ...hospital.toObject(),
        regNo: decryptedRegNo,
      };
      return {
        success: ErrorCodes.Success,
        hospital: decryptedHospital,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new InternalServerErrorException('Error fetching hospital');
    }
  }

  async fetchPendingDoctors(hospitalId: Types.ObjectId): Promise<{
    success: number;
    doctors: PreviewType[];
    message: string;
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist");
      }

      const doctors = hospital.doctors.filter((doctor: PreviewType) => {
        return doctor.status === ApprovalStatus.Pending;
      });

      if (doctors.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
          message: 'No pending doctors found',
        };
      }

      return {
        success: ErrorCodes.Success,
        doctors,
        message: 'pending doctors found',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching pending doctors');
    }
  }

  async fetchPendingPharmacists(hospitalId: Types.ObjectId): Promise<{
    success: number;
    pharmacists: PreviewType[];
    message: string;
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist");
      }

      const pharmacists = hospital.pharmacists.filter(
        (pharmacist: PreviewType) => {
          return pharmacist.status === ApprovalStatus.Pending;
        },
      );

      if (pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
          message: 'No pending pharmacists found',
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
        message: 'pending pharmacists found',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching pharmacists');
    }
  }

  async fetchApprovedDoctors(hospitalId: Types.ObjectId): Promise<{
    success: number;
    doctors: PreviewType[];
    message: string;
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exists");
      }

      const doctors = hospital.doctors.filter((doctor: PreviewType) => {
        return doctor.status === ApprovalStatus.Approved;
      });

      if (doctors.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
          message: 'No approved doctors found',
        };
      }

      console.log(doctors);

      return {
        success: ErrorCodes.Success,
        doctors,
        message: 'Approved doctors fetched successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching approved doctors');
    }
  }

  async fetchApprovedPharmacists(hospitalId: Types.ObjectId): Promise<{
    success: number;
    pharmacists: PreviewType[];
    message: string;
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exists");
      }

      const pharmacists = hospital.pharmacists.filter(
        (pharmacist: PreviewType) => {
          return pharmacist.status === ApprovalStatus.Approved;
        },
      );

      if (pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
          message: 'No approved pharmacists found',
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
        message: 'Approved pharmacists fetched successfully',
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching pharmacists');
    }
  }

  async fetchAllDoctors(
    hospitalId: Types.ObjectId,
  ): Promise<{ success: number; doctors: PreviewType[] }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist");
      }

      const doctors = hospital.doctors;

      if (!doctors) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
        };
      }

      return {
        success: ErrorCodes.Success,
        doctors,
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching approved doctors');
    }
  }

  async fetchAllPharmacists(
    hospitalId: Types.ObjectId,
  ): Promise<{ success: number; pharmacists: PreviewType[] }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist");
      }
      const pharmacists = hospital.pharmacists;
      if (!pharmacists) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching pharmacists');
    }
  }
}
