import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../schema/hospital.schema';
import { Model, Types } from 'mongoose';
import {
  CreateHospitalType,
  UpdateHospitalProfileType,
} from '../interface/hospital.interface';
import { HOSPITAL_PLACEHOLDER } from '@/shared/constants';
import { ApprovalStatus, Category } from '@/shared';

export class HospitalDao {
  constructor(
    @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
  ) {}

  async createHospital(institution: CreateHospitalType) {
    return await this.hospitalModel.create({
      id: institution.id,
      name: institution.name,
      admin: institution.admin,
      email: institution.email,
      phoneNo: institution.phoneNo,
      location: institution.location,
      profilePicture: institution.profilePicture
        ? institution.profilePicture
        : HOSPITAL_PLACEHOLDER,
      description: institution.description,
      status: ApprovalStatus.Pending,
      category: institution.type ? institution.type : Category.General,
      regNo: institution.regNo,
      isVerified: true,
    });
  }

  async fetchHospitalWithBlockchainId(id: number) {
    return await this.hospitalModel.findOne({ id });
  }

  async fetchHospitalByRegNo(regNo: string) {
    return await this.hospitalModel.findOne({ regNo });
  }

  async fetchHospitalByAdminAddress(admin: string) {
    return await this.hospitalModel.findOne({ admin });
  }

  async fetchHospitalWithId(id: Types.ObjectId) {
    return await this.hospitalModel.findOne({ _id: id });
  }

  async updateDoctorStatus(walletAddress: string, status: string) {
    return await this.hospitalModel.findOneAndUpdate(
      { 'doctors.walletAddress': walletAddress },
      { $set: { 'doctors.$.status': status } },
      { new: true },
    );
  }

  async updatePharmacistStatus(walletAddress: string, status: string) {
    return await this.hospitalModel.findOneAndUpdate(
      { 'pharmacists.walletAddress': walletAddress },
      { $set: { 'pharmacists.$.status': status } },
      { new: true },
    );
  }

  async fetchHospitalWithPendingStatus() {
    return await this.hospitalModel.find({
      status: ApprovalStatus.Pending,
    });
  }

  async fetchHospitalWithApprovedStatus() {
    return await this.hospitalModel.find({
      status: ApprovalStatus.Approved,
    });
  }

  async removeHospitalById(id: Types.ObjectId) {
    return await this.hospitalModel.deleteOne({ _id: id });
  }

  async pullOneDoctor(hospitalId: Types.ObjectId, walletAddress: string) {
    return await this.hospitalModel.updateOne(
      { _id: hospitalId },
      { $pull: { doctors: { walletAddress: walletAddress } } },
    );
  }

  async pullOnePharmacist(hospitalId: Types.ObjectId, walletAddress: string) {
    return await this.hospitalModel.updateOne(
      { _id: hospitalId },
      { $pull: { pharmacists: { walletAddress: walletAddress } } },
    );
  }

  async pullManyPharmacists(hospitalIds: number[], walletAddress: string) {
    return await this.hospitalModel.updateMany(
      { id: { $in: hospitalIds } },
      { $pull: { pharmacists: { walletAddress: walletAddress } } },
    );
  }

  async pullManyDoctors(hospitalIds: number[], walletAddress: string) {
    return await this.hospitalModel.updateMany(
      { id: { $in: hospitalIds } },
      { $pull: { doctors: { walletAddress: walletAddress } } },
    );
  }

  async updateHospital(
    hospitalId: Types.ObjectId,
    updateData: UpdateHospitalProfileType,
  ) {
    const updates = Object.keys(updateData).reduce((acc, key) => {
      if (updateData[key] !== undefined) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {});

    return await this.hospitalModel.findOneAndUpdate(
      { _id: hospitalId },
      { $set: updates },
      { new: true, runValidators: true },
    );
  }

  async findManyHospital(adminAddress: string) {
    return await this.hospitalModel.find({ admin: adminAddress });
  }
}
