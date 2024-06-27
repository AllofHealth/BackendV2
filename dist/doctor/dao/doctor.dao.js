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
exports.DoctorDao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const doctor_schema_1 = require("../schema/doctor.schema");
const constants_1 = require("../../shared/constants");
const shared_1 = require("../../shared");
let DoctorDao = class DoctorDao {
    constructor(doctorModel) {
        this.doctorModel = doctorModel;
    }
    async createNewDoctor(doctor) {
        const { id, name, email, profilePicture, specialty, location, phoneNumber, walletAddress, } = doctor;
        return await this.doctorModel.create({
            id,
            name,
            email,
            profilePicture: profilePicture || constants_1.PROFILE_PLACEHOLDER,
            specialty,
            location,
            phoneNumber,
            walletAddress,
            numberOfApprovals: 0,
            status: shared_1.ApprovalStatus.Pending,
            category: shared_1.Category.Doctor,
        });
    }
    async fetchDoctorByAddress(address) {
        return await this.doctorModel.findOne({ walletAddress: address });
    }
    async fetchAllDoctors() {
        return await this.doctorModel.find();
    }
    async fetchDoctorWithPendingStatus() {
        return await this.doctorModel.find({ status: shared_1.ApprovalStatus.Pending });
    }
    async fetchDoctorWithApprovedStatus() {
        return await this.doctorModel.find({ status: shared_1.ApprovalStatus.Approved });
    }
    async deleteDoctor(address) {
        return await this.doctorModel.deleteOne({ walletAddress: address });
    }
    async updateDoctor(address, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            if (updateData[key] !== undefined) {
                acc[key] = updateData[key];
            }
            return acc;
        }, {});
        return await this.doctorModel.findOneAndUpdate({ walletAddress: address }, { $set: updates }, { new: true, runValidators: true });
    }
};
exports.DoctorDao = DoctorDao;
exports.DoctorDao = DoctorDao = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DoctorDao);
//# sourceMappingURL=doctor.dao.js.map