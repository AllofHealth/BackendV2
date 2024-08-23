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
exports.HospitalDao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const hospital_schema_1 = require("../schema/hospital.schema");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../shared/constants");
const shared_1 = require("../../../shared");
let HospitalDao = class HospitalDao {
    constructor(hospitalModel) {
        this.hospitalModel = hospitalModel;
    }
    async createHospital(institution) {
        return await this.hospitalModel.create({
            id: institution.id,
            name: institution.name,
            admin: institution.admin,
            email: institution.email,
            phoneNo: institution.phoneNo,
            location: institution.location,
            profilePicture: institution.profilePicture
                ? institution.profilePicture
                : constants_1.HOSPITAL_PLACEHOLDER,
            description: institution.description,
            status: shared_1.ApprovalStatus.Pending,
            category: institution.type ? institution.type : shared_1.Category.General,
            regNo: institution.regNo,
            isVerified: false,
        });
    }
    async fetchHospitalWithBlockchainId(id) {
        return await this.hospitalModel.findOne({ id });
    }
    async fetchHospitalByRegNo(regNo) {
        return await this.hospitalModel.findOne({ regNo });
    }
    async fetchHospitalByAdminAddress(admin) {
        return await this.hospitalModel.findOne({ admin });
    }
    async fetchHospitalWithId(id) {
        return await this.hospitalModel.findOne({ _id: id });
    }
    async fetchHospitalWithPendingStatus() {
        return await this.hospitalModel.find({
            status: shared_1.ApprovalStatus.Pending,
        });
    }
    async fetchHospitalWithApprovedStatus() {
        return await this.hospitalModel.find({
            status: shared_1.ApprovalStatus.Approved,
        });
    }
    async removeHospitalById(id) {
        return await this.hospitalModel.deleteOne({ _id: id });
    }
    async pullOneDoctor(hospitalId, walletAddress) {
        return await this.hospitalModel.updateOne({ _id: hospitalId }, { $pull: { doctors: { walletAddress: walletAddress } } });
    }
    async pullOnePharmacist(hospitalId, walletAddress) {
        return await this.hospitalModel.updateOne({ _id: hospitalId }, { $pull: { pharmacists: { walletAddress: walletAddress } } });
    }
    async pullManyPharmacists(hospitalIds, walletAddress) {
        return await this.hospitalModel.updateMany({ id: { $in: hospitalIds } }, { $pull: { pharmacists: { walletAddress: walletAddress } } });
    }
    async pullManyDoctors(hospitalIds, walletAddress) {
        return await this.hospitalModel.updateMany({ id: { $in: hospitalIds } }, { $pull: { doctors: { walletAddress: walletAddress } } });
    }
    async updateHospital(hospitalId, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            if (updateData[key] !== undefined) {
                acc[key] = updateData[key];
            }
            return acc;
        }, {});
        return await this.hospitalModel.findOneAndUpdate({ _id: hospitalId }, { $set: updates }, { new: true, runValidators: true });
    }
    async findManyHospital(adminAddress) {
        return await this.hospitalModel.find({ admin: adminAddress });
    }
};
exports.HospitalDao = HospitalDao;
exports.HospitalDao = HospitalDao = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(hospital_schema_1.Hospital.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HospitalDao);
//# sourceMappingURL=hospital.dao.js.map