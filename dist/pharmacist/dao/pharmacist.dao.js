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
exports.PharmacistDao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const pharmacist_schema_1 = require("../schema/pharmacist.schema");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../shared/constants");
const shared_1 = require("../../shared");
let PharmacistDao = class PharmacistDao {
    constructor(pharmacistModel, medicineModel, inventoryModel) {
        this.pharmacistModel = pharmacistModel;
        this.medicineModel = medicineModel;
        this.inventoryModel = inventoryModel;
    }
    async createNewPharmacist(pharmacist) {
        return await this.pharmacistModel.create({
            id: pharmacist.id,
            name: pharmacist.name,
            email: pharmacist.email,
            profilePicture: pharmacist.profilePicture
                ? pharmacist.profilePicture
                : constants_1.PROFILE_PLACEHOLDER,
            location: pharmacist.location,
            phoneNumber: pharmacist.phoneNumber,
            walletAddress: pharmacist.walletAddress,
            status: shared_1.ApprovalStatus.Pending,
        });
    }
    async createMedicine(args) {
        return await this.medicineModel.create({
            name: args.name,
            price: args.price,
            quantity: args.quantity,
            description: args.description,
            sideEffects: args.sideEffects ? args.sideEffects : 'none',
            image: args.image,
            medicineGroup: args.medicineGroup,
        });
    }
    async createInventory(args) {
        return await this.inventoryModel.create({
            numberOfMedicine: args.numberOfMedicine,
            numberOfMedicineGroup: args.numberOfMedicineGroup,
            numberOfMedicineSold: args.numberOfMedicineSold,
            medicines: args.medicines,
        });
    }
    async fetchPharmacist(id) {
        return await this.pharmacistModel.findOne({ id });
    }
    async fetchPharmacistByAddress(address) {
        return await this.pharmacistModel.findOne({ walletAddress: address });
    }
    async fetchAllPharmacists() {
        return await this.pharmacistModel.find();
    }
    async fetchPharmacistWithPendingStatus() {
        return await this.pharmacistModel.find({ status: shared_1.ApprovalStatus.Pending });
    }
    async fetchPharmacistsWithApprovedStatus() {
        return await this.pharmacistModel.find({ status: shared_1.ApprovalStatus.Approved });
    }
    async updatePharmacist(address, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            if (updateData[key] !== undefined) {
                acc[key] = updateData[key];
            }
            return acc;
        }, {});
        const result = await this.pharmacistModel.findOneAndUpdate({ walletAddress: address }, { $set: updates }, { new: true, runValidators: true });
        return result;
    }
    async updateMedicine(medicineId, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            if (updateData[key] !== undefined) {
                acc[key] = updateData[key];
            }
            return acc;
        }, {});
        const result = await this.medicineModel.findOneAndUpdate({ _id: medicineId }, { $set: updates }, { new: true, runValidators: true });
        return result;
    }
    async deleteMedicine(medicineId) {
        return await this.medicineModel.deleteOne({ _id: medicineId });
    }
    async deletePharmacist(address) {
        return await this.pharmacistModel.deleteOne({ walletAddress: address });
    }
};
exports.PharmacistDao = PharmacistDao;
exports.PharmacistDao = PharmacistDao = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(pharmacist_schema_1.Pharmacist.name)),
    __param(1, (0, mongoose_1.InjectModel)(pharmacist_schema_1.Medicine.name)),
    __param(2, (0, mongoose_1.InjectModel)(pharmacist_schema_1.Inventory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PharmacistDao);
//# sourceMappingURL=pharmacist.dao.js.map