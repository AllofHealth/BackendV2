import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from '../schema/otp.schema';
import { Model } from 'mongoose';
import { PatientDao } from '@/modules/patient/dao/patient.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';

@Injectable()
export class OtpDao {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private readonly patientDao: PatientDao,
    private readonly doctorDao: DoctorDao,
    private readonly pharmacistDao: PharmacistDao,
  ) {}

  async createOtp(walletAddress: string, otp: string, expirationTime: Date) {
    return await this.otpModel.create({
      walletAddress,
      otp,
      expirationTime,
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

  async determineRole(walletAddress: string) {
    const patient = await this.fetchPatient(walletAddress);
    if (patient) {
      return 'patient';
    }
    const doctor = await this.fetchDoctor(walletAddress);
    if (doctor) {
      return 'doctor';
    }
    const pharmacist = await this.fetchPharmacist(walletAddress);
    if (pharmacist) {
      return 'pharmacist';
    }
    return null;
  }
}
