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
var HospitalController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalController = void 0;
const common_1 = require("@nestjs/common");
const hospital_service_1 = require("../services/hospital.service");
const mongoose_1 = require("mongoose");
const hospital_dto_1 = require("../dto/hospital.dto");
const hospital_auth_guard_1 = require("../guard/hospital.auth.guard");
const hospital_approved_guard_1 = require("../guard/hospital.approved.guard");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const swagger_1 = require("@nestjs/swagger");
let HospitalController = HospitalController_1 = class HospitalController {
    constructor(hospitalService) {
        this.hospitalService = hospitalService;
        this.logger = new my_logger_service_1.MyLoggerService(HospitalController_1.name);
    }
    async createHospital(ip, createHospitalDto) {
        this.logger.log(`Create Hospital Request\t${ip}`);
        return await this.hospitalService.createNewHospital(createHospitalDto);
    }
    async joinHospital(ip, hospitalId, joinHospitalDto) {
        this.logger.log(`Join Hospital Request\t${ip}`);
        return await this.hospitalService.joinHospital({
            hospitalId,
            walletAddress: joinHospitalDto,
        });
    }
    async approvePractitioner(ip, adminAddress, hospitalId, practitionerAddress) {
        this.logger.log(`Approve Practitioner Request\t${ip}`);
        return await this.hospitalService.approvePractitioner({
            hospitalId,
            walletAddress: practitionerAddress,
        });
    }
    async removePractitioner(ip, adminAddress, hospitalId, practitionerAddress) {
        this.logger.log(`Remove Practitioner Request\t${ip}`);
        return await this.hospitalService.removePractitionerFromHospital({
            hospitalId,
            walletAddress: practitionerAddress,
        });
    }
    async delegateAdmin(ip, adminAddress, newAdminAddress, hospitalId) {
        this.logger.log(`Delegate Admin Request\t${ip}`);
        return await this.hospitalService.delegateAdminPosition(newAdminAddress, hospitalId);
    }
    async updateHospital(ip, adminAddress, hospitalId, updateHospitalDto) {
        this.logger.log(`Update Hospital Request\t${ip}`);
        return await this.hospitalService.updateHospitalProfile(hospitalId, updateHospitalDto);
    }
    async getHospitalById(ip, hospitalId) {
        this.logger.log(`Get Hospital By Id Request\t${ip}`);
        return await this.hospitalService.fetchHospitalById(hospitalId);
    }
    async getAllHospitals(ip) {
        this.logger.log(`Get All Hospitals Request\t${ip}`);
        return await this.hospitalService.fetchAllHospitals();
    }
    async getApprovedHospitals(ip) {
        this.logger.log(`Get Approved Hospitals  Request\t${ip}`);
        return await this.hospitalService.fetchApprovedHospitals();
    }
    async getPendingHospitals(ip) {
        this.logger.log(`Get Pending Hospitals Request\t${ip}`);
        return await this.hospitalService.fetchPendingHospitals();
    }
    async getApprovedDoctors(ip, hospitalId) {
        this.logger.log(`Get Approved Doctors Request\t${ip}`);
        return await this.hospitalService.fetchApprovedDoctors(hospitalId);
    }
    async getPendingDoctors(ip, hospitalId) {
        this.logger.log(`Get Pending Doctors Request\t${ip}`);
        return await this.hospitalService.fetchPendingDoctors(hospitalId);
    }
    async getAllDoctors(ip, hospitalId) {
        this.logger.log(`Get All Doctors Request\t${ip}`);
        return await this.hospitalService.fetchAllDoctors(hospitalId);
    }
    async getApprovedPharmacists(ip, hospitalId) {
        this.logger.log(`Get Approved Pharmacist Request\t${ip}`);
        return await this.hospitalService.fetchApprovedPharmacists(hospitalId);
    }
    async getPendingPharmacists(ip, hospitalId) {
        this.logger.log(`Get Pending Pharmacist Request\t${ip}`);
        return await this.hospitalService.fetchPendingPharmacists(hospitalId);
    }
    async getAllPharmacists(ip, hospitalId) {
        this.logger.log(`Get All Pharmacist Request\t${ip}`);
        return await this.hospitalService.fetchAllPharmacists(hospitalId);
    }
    async getAllPractitioners(ip, hospitalId) {
        this.logger.log(`Get All Practitioners Request\t${ip}`);
        return await this.hospitalService.fetchHospitalPractitioners(hospitalId);
    }
    async getPractitionerCreatedHospital(ip, walletAddress) {
        this.logger.log(`Get Practitioner Created Hospital Request\t${ip}`);
        return await this.hospitalService.fetchPractitionerCreatedHospital(walletAddress);
    }
};
exports.HospitalController = HospitalController;
__decorate([
    (0, common_1.Post)('createHospital'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hospital_dto_1.CreateHospitalDto]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "createHospital", null);
__decorate([
    (0, common_1.Post)('joinHospital'),
    (0, common_1.UseGuards)(hospital_approved_guard_1.HospitalApprovedGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "joinHospital", null);
__decorate([
    (0, common_1.Post)('approvePractitioner'),
    (0, common_1.UseGuards)(hospital_auth_guard_1.HospitalAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('practitionerAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "approvePractitioner", null);
__decorate([
    (0, common_1.Post)('removePractitioner'),
    (0, common_1.UseGuards)(hospital_auth_guard_1.HospitalAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('practitionerAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "removePractitioner", null);
__decorate([
    (0, common_1.Post)('delegateAdmin'),
    (0, common_1.UseGuards)(hospital_auth_guard_1.HospitalAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('newAdminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "delegateAdmin", null);
__decorate([
    (0, common_1.Post)('updateHospital'),
    (0, common_1.UseGuards)(hospital_auth_guard_1.HospitalAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId, hospital_dto_1.UpdateHospitalProfileDto]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "updateHospital", null);
__decorate([
    (0, common_1.Get)('hospitalById'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getHospitalById", null);
__decorate([
    (0, common_1.Get)('allHospitals'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllHospitals", null);
__decorate([
    (0, common_1.Get)('approvedHospitals'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getApprovedHospitals", null);
__decorate([
    (0, common_1.Get)('pendingHospitals'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPendingHospitals", null);
__decorate([
    (0, common_1.Get)('approvedDoctors'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getApprovedDoctors", null);
__decorate([
    (0, common_1.Get)('pendingDoctors'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPendingDoctors", null);
__decorate([
    (0, common_1.Get)('allDoctors'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllDoctors", null);
__decorate([
    (0, common_1.Get)('approvedPharmacists'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getApprovedPharmacists", null);
__decorate([
    (0, common_1.Get)('pendingPharmacists'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPendingPharmacists", null);
__decorate([
    (0, common_1.Get)('allPharmacists'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllPharmacists", null);
__decorate([
    (0, common_1.Get)('allPractitioners'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllPractitioners", null);
__decorate([
    (0, common_1.Get)('practitionerCreatedHospitals'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPractitionerCreatedHospital", null);
exports.HospitalController = HospitalController = HospitalController_1 = __decorate([
    (0, swagger_1.ApiTags)('hospital'),
    (0, common_1.Controller)('hospital'),
    __metadata("design:paramtypes", [hospital_service_1.HospitalService])
], HospitalController);
//# sourceMappingURL=hospital.controller.js.map