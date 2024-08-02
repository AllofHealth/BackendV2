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
exports.HospitalController = void 0;
const common_1 = require("@nestjs/common");
const hospital_service_1 = require("../services/hospital.service");
const mongoose_1 = require("mongoose");
const hospital_dto_1 = require("../dto/hospital.dto");
let HospitalController = class HospitalController {
    constructor(hospitalService) {
        this.hospitalService = hospitalService;
    }
    async createHospital(createHospitalDto) {
        return await this.hospitalService.createNewHospital(createHospitalDto);
    }
    async joinHospital(hospitalId, joinHospitalDto) {
        return await this.hospitalService.joinHospital({
            hospitalId,
            walletAddress: joinHospitalDto,
        });
    }
    async approvePractitioner(hospitalId, adminAddress, practitionerAddress) {
        return await this.hospitalService.approvePractitioner(adminAddress, {
            hospitalId,
            walletAddress: practitionerAddress,
        });
    }
    async removePractitioner(hospitalId, adminAddress, practitionerAddress) {
        return await this.hospitalService.removePractitionerFromHospital(adminAddress, {
            hospitalId,
            walletAddress: practitionerAddress,
        });
    }
    async delegateAdmin(args) {
        return await this.hospitalService.delegateAdminPosition(args.newAdminAddress, args.adminAddress, args.hospitalId);
    }
    async updateHospital(hospitalId, adminAddress, updateHospitalDto) {
        return await this.hospitalService.updateHospitalProfile(hospitalId, adminAddress, updateHospitalDto);
    }
    async getHospitalById(hospitalId) {
        return await this.hospitalService.fetchHospitalById(hospitalId);
    }
    async getAllHospitals() {
        return await this.hospitalService.fetchAllHospitals();
    }
    async getApprovedHospitals() {
        return await this.hospitalService.fetchApprovedHospitals();
    }
    async getPendingHospitals() {
        return await this.hospitalService.fetchPendingHospitals();
    }
    async getApprovedDoctors(hospitalId) {
        return await this.hospitalService.fetchApprovedDoctors(hospitalId);
    }
    async getPendingDoctors(hospitalId) {
        return await this.hospitalService.fetchPendingDoctors(hospitalId);
    }
    async getAllDoctors(hospitalId) {
        return await this.hospitalService.fetchAllDoctors(hospitalId);
    }
    async getApprovedPharmacists(hospitalId) {
        return await this.hospitalService.fetchApprovedPharmacists(hospitalId);
    }
    async getPendingPharmacists(hospitalId) {
        return await this.hospitalService.fetchPendingPharmacists(hospitalId);
    }
    async getAllPharmacists(hospitalId) {
        return await this.hospitalService.fetchAllPharmacists(hospitalId);
    }
    async getAllPractitioners(hospitalId) {
        return await this.hospitalService.fetchHospitalPractitioners(hospitalId);
    }
    async getPractitionerCreatedHospital(walletAddress) {
        return await this.hospitalService.fetchPractitionerCreatedHospital(walletAddress);
    }
};
exports.HospitalController = HospitalController;
__decorate([
    (0, common_1.Post)('createHospital'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hospital_dto_1.CreateHospitalDto]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "createHospital", null);
__decorate([
    (0, common_1.Post)('joinHospital'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "joinHospital", null);
__decorate([
    (0, common_1.Post)('approvePractitioner'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('practitionerAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "approvePractitioner", null);
__decorate([
    (0, common_1.Post)('removePractitioner'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('practitionerAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "removePractitioner", null);
__decorate([
    (0, common_1.Post)('delegateAdmin'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "delegateAdmin", null);
__decorate([
    (0, common_1.Post)('updateHospital'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String, hospital_dto_1.UpdateHospitalProfileDto]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "updateHospital", null);
__decorate([
    (0, common_1.Get)('hospitalById'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getHospitalById", null);
__decorate([
    (0, common_1.Get)('allHospitals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllHospitals", null);
__decorate([
    (0, common_1.Get)('approvedHospitals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getApprovedHospitals", null);
__decorate([
    (0, common_1.Get)('pendingHospitals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPendingHospitals", null);
__decorate([
    (0, common_1.Get)('approvedDoctors'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getApprovedDoctors", null);
__decorate([
    (0, common_1.Get)('pendingDoctors'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPendingDoctors", null);
__decorate([
    (0, common_1.Get)('allDoctors'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllDoctors", null);
__decorate([
    (0, common_1.Get)('approvedPharmacists'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getApprovedPharmacists", null);
__decorate([
    (0, common_1.Get)('pendingPharmacists'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPendingPharmacists", null);
__decorate([
    (0, common_1.Get)('allPharmacists'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllPharmacists", null);
__decorate([
    (0, common_1.Get)('allPractitioners'),
    __param(0, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getAllPractitioners", null);
__decorate([
    (0, common_1.Get)('practitionerCreatedHospitals'),
    __param(0, (0, common_1.Query)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getPractitionerCreatedHospital", null);
exports.HospitalController = HospitalController = __decorate([
    (0, common_1.Controller)('hospital'),
    __metadata("design:paramtypes", [hospital_service_1.HospitalService])
], HospitalController);
//# sourceMappingURL=hospital.controller.js.map