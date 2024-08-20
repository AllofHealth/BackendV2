import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from '../schema/otp.schema';
import { Model } from 'mongoose';
import { PatientDao } from '@/modules/patient/dao/patient.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { RoleType } from '../interface/otp.interface';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { AdminDao } from '@/modules/admin/dao/admin.dao';

@Injectable()
export class OtpDao {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private readonly patientDao: PatientDao,
    private readonly doctorDao: DoctorDao,
    private readonly pharmacistDao: PharmacistDao,
    private readonly hospitalDao: HospitalDao,
    private readonly adminDao: AdminDao,
  ) {}

  async createOtp(
    walletAddress: string,
    otp: string,
    expirationTime: Date,
    role: RoleType,
  ) {
    return await this.otpModel.create({
      walletAddress,
      otp,
      expirationTime,
      role,
    });
  }

  async deleteOtp(walletAddress: string) {
    return await this.otpModel.deleteOne({ walletAddress });
  }

  async findOtp(walletAddress: string) {
    return await this.otpModel.findOne({ walletAddress });
  }

  async fetchPatient(walletAddress: string) {
    return await this.patientDao.fetchPatientByAddress(walletAddress);
  }

  async fetchDoctor(walletAddress: string) {
    return await this.doctorDao.fetchDoctorByAddress(walletAddress);
  }

  async fetchPharmacist(walletAddress: string) {
    return await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
  }

  async fetchInstitution(walletAddress: string) {
    return await this.hospitalDao.fetchHospitalByAdminAddress(walletAddress);
  }

  async fetchAdmin(walletAddress: string) {
    return await this.adminDao.fetchAdminByAddress(walletAddress);
  }
}
