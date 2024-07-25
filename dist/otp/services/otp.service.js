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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const otp_dao_1 = require("../dao/otp.dao");
let OtpService = class OtpService {
    constructor(otpDao) {
        this.otpDao = otpDao;
        this.otpStore = new Map();
        this.expirationTime = 1000 * 60 * 5;
    }
    generateSecret() {
        return otplib_1.authenticator.generateSecret();
    }
    async generateOtp(secret) {
        const otp = otplib_1.authenticator.generate(secret);
        const expiresAt = Date.now() + this.expirationTime;
        try {
            const result = await this.otpDao.createOtp(secret, otp, new Date(expiresAt));
            if (!result) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'otp not created',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                otp,
                expiresAt,
                message: 'otp created',
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('error while generating otp');
        }
    }
    async verifyOtp(secret, otp) {
        try {
            const entry = await this.otpDao.findOtp(secret);
            if (!entry) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'no entry',
                };
            }
            if (new Date(Date.now()) > entry.expirationTime) {
                await this.otpDao.deleteOtp(secret);
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'otp expired',
                };
            }
            const isValid = otplib_1.authenticator.verify({ token: otp, secret });
            if (!isValid) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'otp invalid',
                };
            }
            await this.otpDao.deleteOtp(secret);
            return {
                success: common_1.HttpStatus.OK,
                message: 'otp verified',
                isValid,
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('error while verifying otp');
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_dao_1.OtpDao])
], OtpService);
//# sourceMappingURL=otp.service.js.map