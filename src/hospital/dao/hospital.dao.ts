import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from '../schema/hospital.schema';
import { Model, Types } from 'mongoose';
import {
  CreateHospitalType,
  HospitalType,
  PreviewType,
} from '../interface/hospital.interface';
import { HOSPITAL_PLACEHOLDER } from 'src/shared/constants';
import { ApprovalStatus, Category, HospitalError } from 'src/shared';
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
    hospital: HospitalType,
    doctorAddress: string,
  ) {
    try {
      hospital.doctors = hospital.doctors.filter(
        (d: PreviewType) => d.walletAddress !== doctorAddress,
      );
      console.info('doctor removed');
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error removing doctor');
    }
  }

  async removePharmacistFromHospital(
    hospital: HospitalType,
    pharmacistAddress: string,
  ) {
    try {
      hospital.pharmacists = hospital.pharmacists.filter(
        (d: PreviewType) => d.walletAddress !== pharmacistAddress,
      );
      console.info('pharmacist removed');
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error removing pharmacist');
    }
  }

  async validateHospitalAdmin(hospital: HospitalType, adminAddress: string) {
    if (!hospital || !adminAddress || adminAddress.length !== 42) {
      throw new HospitalError('Error validating parameters');
    }

    let isAdmin = false;
    try {
      if (hospital.admin === adminAddress) {
        isAdmin = true;
      }
      return isAdmin;
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error validating admin');
    }
  }

  async validateHospitalExists(hospitalId: Types.ObjectId) {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }
    try {
      let hospitalExist = false;
      const hospital = await this.hospitalModel.findById(hospitalId);
      if (hospital) {
        hospitalExist = true;
      }
      return hospitalExist;
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error validating hospital');
    }
  }
}
