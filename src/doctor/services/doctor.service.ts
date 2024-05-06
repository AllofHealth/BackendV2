import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from '../schema/doctor.schema';
import { Model, MongooseError } from 'mongoose';
import { DoctorDao } from '../dao/doctor.dao';
import { CreateDoctorType } from '../interface/doctor.interface';
import { DoctorError, ErrorCodes } from 'src/shared';
import { DoctorGuard } from '../guards/doctor.guard';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { PreviewType } from 'src/hospital/interface/hospital.interface';
import { decrypt } from 'src/shared/utils/encrypt.utils';

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
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new DoctorError('Error fetching approved doctors');
    }
  }

  async createDoctor(args: CreateDoctorType) {
    const requiredParams = [
      'id',
      'email',
      'regNo',
      'phoneNumber',
      'specialty',
      'location',
      'walletAddress',
    ];

    if (
      !requiredParams.every((param) => args[param as keyof CreateDoctorType])
    ) {
      throw new DoctorError('Missing required parameter');
    }

    const doctorExist = await this.doctorGuard.validateDoctorExists(
      args.walletAddress,
    );
    if (doctorExist) {
      return {
        success: ErrorCodes.Error,
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

      doctor.hospitalIds.push(args.hospitalIds);

      const doctorPreview = {
        walletAddress: doctor.walletAddress,
        profilePicture: doctor.profilePicture,
        name: doctor.name,
        regNo: doctor.regNo,
        status: doctor.status,
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
        success: ErrorCodes.Success,
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
          success: ErrorCodes.NotFound,
          message: "Doctor doesn't exist",
        };
      }

      const decryptedRegNo = decrypt({ data: doctor.regNo });
      const decryptedDoctor = {
        ...doctor.toObject(),
        regNo: decryptedRegNo,
      };

      console.log(doctor);
      return {
        success: ErrorCodes.Success,
        doctor: decryptedDoctor,
      };
    } catch (error) {
      console.error(error.message);
      throw new DoctorError('error fetching doctor by address');
    }
  }

  async getAllDoctors() {
    return await this.doctorDao.fetchAllDoctors();
  }
}
