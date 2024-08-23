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
exports.AdminDao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const admin_schema_1 = require("../schema/admin.schema");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../shared/constants");
const shared_1 = require("../../../shared");
let AdminDao = class AdminDao {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async createAdmin(admin) {
        return await this.adminModel.create({
            id: admin.id,
            name: admin.name,
            profilePicture: admin.profilePicture
                ? admin.profilePicture
                : constants_1.PROFILE_PLACEHOLDER,
            email: admin.email,
            walletAddress: admin.walletAddress,
            category: shared_1.Category.Admin,
            isVerified: false,
        });
    }
    async removeAdminByAddress(walletAddress) {
        return await this.adminModel.deleteOne({ walletAddress });
    }
    async validateAdminExists(address) {
        let adminExists = false;
        try {
            const admin = await this.adminModel.findOne({ walletAddress: address });
            if (admin) {
                adminExists = true;
            }
            return adminExists;
        }
        catch (error) {
            throw new shared_1.AdminError('Error validating admin exists');
        }
    }
    async fetchAdminByAddress(walletAddress) {
        return await this.adminModel.findOne({ walletAddress });
    }
    async fetchAllAdmins() {
        return await this.adminModel.find();
    }
    async updateAdmin(address, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            if (updateData[key] !== undefined) {
                acc[key] = updateData[key];
            }
            return acc;
        }, {});
        return await this.adminModel.updateOne({ walletAddress: address }, { $set: updates }, { new: true, runValidators: true });
    }
};
exports.AdminDao = AdminDao;
exports.AdminDao = AdminDao = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminDao);
//# sourceMappingURL=admin.dao.js.map