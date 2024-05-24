import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from '../schema/doctor.schema';
import { Model, MongooseError } from 'mongoose';
import { DoctorDao } from '../dao/doctor.dao';
import {
  CreateDoctorType,
  UpdateDoctorType,
} from '../interface/doctor.interface';
import { Category, DoctorError } from 'src/shared';
import { DoctorGuard } from '../guards/doctor.guard';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { PreviewType } from 'src/hospital/interface/hospital.interface';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    private readonly doctorDao: DoctorDao,
    private readonly doctorGuard: DoctorGuard,
    private readonly hospitalDao: HospitalDao,
  ) {}

  async getPendingDoctors() {
    try {
      const doctors = await this.doctorDao.fetchDoctorWithPendingStatus();
      if (!doctors) {
        return {
          success: HttpStatus.NOT_FOUND,
          doctors: [],
        };
      }

      return {
        success: HttpStatus.OK,
        doctors,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new DoctorError('Error fetching doctors');
    }
  }

  async getApprovedDoctors() {
    try {
      const doctors = await this.doctorDao.fetchDoctorWithApprovedStatus();
      if (!doctors) {
        return {
          success: HttpStatus.NOT_FOUND,
          doctors: [],
        };
      }

      return {
        success: HttpStatus.OK,
        doctors,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new DoctorError('Error fetching approved doctors');
    }
  }

  async createDoctor(args: CreateDoctorType) {
    const doctorExist = await this.doctorGuard.validateDoctorExists(
      args.walletAddress,
    );
    if (doctorExist) {
      return {
        success: HttpStatus.CREATED,
        message: 'Doctor already exists',
      };
    }

    if (
      await this.doctorGuard.validateDoctorExistsInHospital(
        args.hospitalIds as number,
        args.walletAddress,
      )
    ) {
      throw new DoctorError('Doctor already exists in hospital');
    }

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        args.hospitalIds as number,
      );

      if (!hospital) {
        throw new DoctorError("Hospital doesn't exist");
      }

      let doctor = await this.doctorDao.createNewDoctor(args);
      doctor = await this.doctorDao.fetchDoctorByAddress(args.walletAddress);

      try {
        doctor.hospitalIds.push(args.hospitalIds);
      } catch (error) {
        await this.doctorDao.deleteDoctor(args.walletAddress);
        throw new Error('Error adding doctor');
      }

      const doctorPreview = {
        walletAddress: doctor.walletAddress,
        hospitalIds: doctor.hospitalIds,
        profilePicture: doctor.profilePicture,
        name: doctor.name,
        status: doctor.status,
        category: Category.Doctor,
      };

      try {
        hospital.doctors.push(doctorPreview as PreviewType);
      } catch (error) {
        await this.doctorDao.deleteDoctor(args.walletAddress);
        throw new Error('Error adding doctor to hospital');
      }

      await doctor.save();
      await hospital.save();

      return {
        success: HttpStatus.OK,
        doctor,
        message: 'Doctor created successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new DoctorError('Error creating doctor');
    }
  }

  async getDoctorByAddress(address: string) {
    if (!address || address.length !== 42) {
      throw new Error('Invalid address');
    }

    try {
      const doctor = await this.doctorDao.fetchDoctorByAddress(address);

      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: "Doctor doesn't exist",
        };
      }

      return {
        success: HttpStatus.OK,
        doctor,
      };
    } catch (error) {
      console.error(error.message);
      throw new DoctorError('error fetching doctor by address');
    }
  }

  async getAllDoctors() {
    try {
      const allDoctors = await this.doctorDao.fetchAllDoctors();
      if (!allDoctors) {
        return {
          success: HttpStatus.FOUND,
          allDoctors: [],
        };
      }

      return {
        success: HttpStatus.OK,
        allDoctors,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new DoctorError('error fetching all doctors');
    }
  }

  async updateDoctor(walletAddress: string, args: UpdateDoctorType) {
    try {
      const doctorExist =
        await this.doctorGuard.validateDoctorExists(walletAddress);
      if (!doctorExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Doctor not found',
        };
      }

      const doctor = await this.doctorDao.updateDoctor(walletAddress, args);
      return {
        success: HttpStatus.OK,
        message: 'Doctor updated successfully',
        doctor,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new DoctorError('Error updating doctor');
    }
  }

  async deleteDoctorByAddress(address: string) {
    try {
      const doctorExist = await this.doctorGuard.validateDoctorExists(address);
      if (!doctorExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Doctor not found',
        };
      }
      const doctor = await this.doctorDao.fetchDoctorByAddress(address);
      const hospitalIds = doctor.hospitalIds;
      await this.hospitalDao.pullManyDoctors(hospitalIds, address);
      await this.doctorDao.deleteDoctor(address);
      return {
        success: HttpStatus.OK,
        message: 'Doctor deleted successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new InternalServerErrorException('Error deleting doctor');
    }
  }
}
