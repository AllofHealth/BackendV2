import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../schema/hospital.schema';
import { Model, Types } from 'mongoose';
import { CreateHospitalType } from '../interface/hospital.interface';
import { HOSPITAL_PLACEHOLDER } from 'src/shared/constants';
import { ApprovalStatus, Category } from 'src/shared';
import { encrypt } from 'src/shared/utils/encrypt.utils';

export class HospitalDao {
  constructor(
    @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
  ) {}

  async createHospital(hospital: CreateHospitalType) {
    const encryptedRegNo = encrypt({ data: hospital.regNo });
    return await this.hospitalModel.create({
      id: hospital.id,
      name: hospital.name,
      admin: hospital.admin,
      email: hospital.email,
      phoneNo: hospital.phoneNo,
      regNo: encryptedRegNo,
      location: hospital.location,
      profilePicture: hospital.profilePicture
        ? hospital.profilePicture
        : HOSPITAL_PLACEHOLDER,
      description: hospital.description,
      status: ApprovalStatus.Pending,
      category: Category.Hospital,
    });
  }

  async fetchHospitalWithBlockchainId(id: number) {
    return await this.hospitalModel.findOne({ id });
  }

  async fetchHospitalByRegNo(regNo: string) {
    return await this.hospitalModel.findOne({ regNo });
  }

  async fetchHospitalWithId(id: Types.ObjectId) {
    return await this.hospitalModel.findOne({ _id: id });
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
}
