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
const postmark_service_1 = require("../../postmark/service/postmark.service");
let OtpService = class OtpService {
    constructor(otpDao, postmarkService) {
        this.otpDao = otpDao;
        this.postmarkService = postmarkService;
        this.expirationTime = 1000 * 60 * 5;
    }
    async cleanUp(secret) {
        try {
            await this.otpDao.deleteOtp(secret);
        }
        catch (error) {
            console.error(error);
            throw new Error('error while cleaning up otp');
        }
    }
    async generateOtp(secret) {
        const otp = otplib_1.authenticator.generate(secret);
        const expiresAt = Date.now() + this.expirationTime;
        try {
            await this.cleanUp(secret);
            if (!otp) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'otp not generated',
                };
            }
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
    async verifyUser(walletAddress) {
        try {
            const role = await this.otpDao.determineRole(walletAddress);
            switch (role) {
                case 'patient':
                    const patient = await this.otpDao.fetchPatient(walletAddress);
                    patient.isVerified = true;
                    await patient.save();
                    break;
                case 'doctor':
                    const doctor = await this.otpDao.fetchDoctor(walletAddress);
                    doctor.isVerified = true;
                    await doctor.save();
                    break;
                case 'pharmacist':
                    const pharmacist = await this.otpDao.fetchPharmacist(walletAddress);
                    pharmacist.isVerified = true;
                    await pharmacist.save();
                    break;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('error while verifying user');
        }
    }
    async verifyOtp(secret, otp) {
        let isValid = false;
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
            if (entry.otp === otp) {
                isValid = true;
            }
            if (!isValid) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'otp invalid',
                };
            }
            await this.otpDao.deleteOtp(secret);
            try {
                await this.verifyUser(entry.walletAddress);
            }
            catch (error) {
                console.error(error);
                await this.verifyUser(entry.walletAddress);
            }
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
    async deliverOtp(walletAddress, emailAddress) {
        try {
            const { otp } = await this.generateOtp(walletAddress);
            console.log(otp);
            await this.postmarkService.sendEmail({
                to: emailAddress,
                otp,
            });
            console.log('otp sent successfully');
        }
        catch (error) {
            console.error(error);
            throw new Error('an error occurred while delivering otp');
        }
    }
    async resendOtp(walletAddress) {
        await this.cleanUp(walletAddress);
        try {
            const role = await this.otpDao.determineRole(walletAddress);
            switch (role) {
                case 'patient':
                    const patient = await this.otpDao.fetchPatient(walletAddress);
                    await this.deliverOtp(walletAddress, patient.email);
                    break;
                case 'doctor':
                    const doctor = await this.otpDao.fetchDoctor(walletAddress);
                    await this.deliverOtp(walletAddress, doctor.email);
                    break;
                case 'pharmacist':
                    const pharmacist = await this.otpDao.fetchPharmacist(walletAddress);
                    await this.deliverOtp(walletAddress, pharmacist.email);
                    break;
            }
            return {
                success: common_1.HttpStatus.OK,
                message: 'otp resent successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('an error occurred while resending otp');
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_dao_1.OtpDao,
        postmark_service_1.PostmarkService])
], OtpService);
//# sourceMappingURL=otp.service.js.map