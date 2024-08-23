"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpDao = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const otp_schema_1 = require("../schema/otp.schema");
const mongoose_2 = require("mongoose");
const patient_dao_1 = require("../../patient/dao/patient.dao");
const doctor_dao_1 = require("../../doctor/dao/doctor.dao");
const pharmacist_dao_1 = require("../../pharmacist/dao/pharmacist.dao");
const hospital_dao_1 = require("../../hospital/dao/hospital.dao");
const admin_dao_1 = require("../../admin/dao/admin.dao");
let OtpDao = class OtpDao {
    constructor(otpModel, patientDao, doctorDao, pharmacistDao, hospitalDao, adminDao) {
        this.otpModel = otpModel;
        this.patientDao = patientDao;
        this.doctorDao = doctorDao;
        this.pharmacistDao = pharmacistDao;
        this.hospitalDao = hospitalDao;
        this.adminDao = adminDao;
    }
    async createOtp(walletAddress, otp, expirationTime, role) {
        return await this.otpModel.create({
            walletAddress,
            otp,
            expirationTime,
            role,
        });
    }
    async deleteOtp(walletAddress) {
        return await this.otpModel.deleteOne({ walletAddress });
    }
    async findOtp(walletAddress) {
        return await this.otpModel.findOne({ walletAddress });
    }
    async fetchPatient(walletAddress) {
        return await this.patientDao.fetchPatientByAddress(walletAddress);
    }
    async fetchDoctor(walletAddress) {
        return await this.doctorDao.fetchDoctorByAddress(walletAddress);
    }
    async fetchPharmacist(walletAddress) {
        return await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
    }
    async fetchInstitution(walletAddress) {
        return await this.hospitalDao.fetchHospitalByAdminAddress(walletAddress);
    }
    async fetchAdmin(walletAddress) {
        return await this.adminDao.fetchAdminByAddress(walletAddress);
    }
};
exports.OtpDao = OtpDao;
exports.OtpDao = OtpDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        patient_dao_1.PatientDao,
        doctor_dao_1.DoctorDao,
        pharmacist_dao_1.PharmacistDao,
        hospital_dao_1.HospitalDao,
        admin_dao_1.AdminDao])
], OtpDao);
//# sourceMappingURL=otp.dao.js.map