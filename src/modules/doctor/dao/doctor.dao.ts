import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from '../schema/doctor.schema';
import {
  CreateDoctorType,
  UpdateDoctorType,
} from '../interface/doctor.interface';
import { PROFILE_PLACEHOLDER } from '@/shared/constants';
import { ApprovalStatus, Category } from '@/shared';

export class DoctorDao {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,
  ) {}

  async createNewDoctor(doctor: CreateDoctorType) {
    const {
      id,
      name,
      email,
      profilePicture,
      specialty,
      location,
      phoneNumber,
      walletAddress,
    } = doctor;
    return await this.doctorModel.create({
      id,
      name,
      email,
      profilePicture: profilePicture || PROFILE_PLACEHOLDER,
      specialty,
      location,
      phoneNumber,
      walletAddress,
      numberOfApprovals: 0,
      status: ApprovalStatus.Pending,
      category: Category.Doctor,
      isVerified: false,
    });
  }

  async fetchDoctorByAddress(address: string) {
    return await this.doctorModel.findOne({ walletAddress: address });
  }

  async fetchAllDoctors() {
    return await this.doctorModel.find();
  }

  async fetchDoctorWithPendingStatus() {
    return await this.doctorModel.find({ status: ApprovalStatus.Pending });
  }

  async fetchDoctorWithApprovedStatus() {
    return await this.doctorModel.find({ status: ApprovalStatus.Approved });
  }

  async deleteDoctor(address: string) {
    return await this.doctorModel.deleteOne({ walletAddress: address });
  }

  async updateDoctor(address: string, updateData: UpdateDoctorType) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    return await this.doctorModel.findOneAndUpdate(
      { walletAddress: address },
      { $set: updates },
      { new: true, runValidators: true },
    );
  }
}
