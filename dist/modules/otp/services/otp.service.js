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
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const otp_dao_1 = require("../dao/otp.dao");
const postmark_service_1 = require("../../postmark/service/postmark.service");
const shared_dto_1 = require("../../../shared/dto/shared.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const shared_events_1 = require("../../../shared/events/shared.events");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
let OtpService = OtpService_1 = class OtpService {
    constructor(otpDao, postmarkService) {
        this.otpDao = otpDao;
        this.postmarkService = postmarkService;
        this.logger = new my_logger_service_1.MyLoggerService(OtpService_1.name);
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
    async generateOtp(secret, role) {
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
            const result = await this.otpDao.createOtp(secret, otp, new Date(expiresAt), role);
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
    async verifyUser(walletAddress, role) {
        try {
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
                case 'institution':
                    const institution = await this.otpDao.fetchInstitution(walletAddress);
                    institution.isVerified = true;
                    await institution.save();
                    break;
                case 'admin':
                    const admin = await this.otpDao.fetchAdmin(walletAddress);
                    admin.isVerified = true;
                    await admin.save();
                    break;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('error while verifying user');
        }
    }
    async verifyOtp(secret, otp, role) {
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
                await this.verifyUser(entry.walletAddress, role);
            }
            catch (error) {
                console.error(error);
                await this.verifyUser(entry.walletAddress, role);
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
    async deliverOtp(args) {
        const { walletAddress, email, role } = args;
        try {
            this.logger.log(`generating otp`);
            const { otp } = await this.generateOtp(walletAddress, role);
            this.logger.log(`delivering email to ${email}`);
            await this.postmarkService.sendEmail({
                to: email,
                otp,
            });
            this.logger.log(`otp delivered successfully`);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException('an error occurred while delivering otp', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resendOtp(walletAddress, role) {
        await this.cleanUp(walletAddress);
        try {
            switch (role) {
                case 'patient':
                    const patient = await this.otpDao.fetchPatient(walletAddress);
                    await this.deliverOtp({
                        walletAddress,
                        email: patient.email,
                        role: 'patient',
                    });
                    break;
                case 'doctor':
                    const doctor = await this.otpDao.fetchDoctor(walletAddress);
                    await this.deliverOtp({
                        walletAddress,
                        email: doctor.email,
                        role: 'doctor',
                    });
                    break;
                case 'pharmacist':
                    const pharmacist = await this.otpDao.fetchPharmacist(walletAddress);
                    await this.deliverOtp({
                        walletAddress,
                        email: pharmacist.email,
                        role: 'pharmacist',
                    });
                    break;
                case 'institution':
                    const institution = await this.otpDao.fetchInstitution(walletAddress);
                    await this.deliverOtp({
                        walletAddress,
                        email: institution.admin,
                        role: 'institution',
                    });
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
__decorate([
    (0, event_emitter_1.OnEvent)(shared_events_1.SharedEvents.ENTITY_CREATED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_dto_1.EntityCreatedDto]),
    __metadata("design:returntype", Promise)
], OtpService.prototype, "deliverOtp", null);
exports.OtpService = OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_dao_1.OtpDao,
        postmark_service_1.PostmarkService])
], OtpService);
//# sourceMappingURL=otp.service.js.map