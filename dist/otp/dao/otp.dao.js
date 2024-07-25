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
let OtpDao = class OtpDao {
    constructor(otpModel) {
        this.otpModel = otpModel;
    }
    async createOtp(walletAddress, otp, expirationTime) {
        return await this.otpModel.create({
            walletAddress,
            otp,
            expirationTime,
        });
    }
    async deleteOtp(walletAddress) {
        return await this.otpModel.deleteOne({ walletAddress });
    }
    async findOtp(walletAddress) {
        return await this.otpModel.findOne({ walletAddress });
    }
};
exports.OtpDao = OtpDao;
exports.OtpDao = OtpDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OtpDao);
//# sourceMappingURL=otp.dao.js.map