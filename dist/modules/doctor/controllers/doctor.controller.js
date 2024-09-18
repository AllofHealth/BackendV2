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
var DoctorController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("../services/doctor.service");
const doctor_dto_1 = require("../dto/doctor.dto");
const mongoose_1 = require("mongoose");
const doctor_auth_guard_1 = require("../guards/doctor.auth.guard");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
let DoctorController = DoctorController_1 = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
        this.logger = new my_logger_service_1.MyLoggerService(DoctorController_1.name);
    }
    async createDoctor(ip, createDoctorDto) {
        this.logger.log(`Create New Doctor Request\t${ip}`);
        return await this.doctorService.createDoctor(createDoctorDto);
    }
    async updateDoctor(ip, walletAddress, updateDoctorDto) {
        this.logger.log(`Update Doctor Request\t${ip}`);
        return await this.doctorService.updateDoctor(walletAddress, updateDoctorDto);
    }
    async addPatientPrescription(ip, doctorAddress, patientAddress, prescriptionDto) {
        this.logger.log(`Add Patient Prescription Request\t${ip}`);
        return await this.doctorService.createPrescription({
            recordId: prescriptionDto.recordId,
            patientAddress,
            doctorAddress,
            medicine: prescriptionDto.medicine,
        });
    }
    async approveRecordAccessRequest(ip, doctorAddress, patientAddress, recordId) {
        this.logger.log(`Approve Record Access Request\t${ip}`);
        return await this.doctorService.approveMedicalRecordAccessRequest({
            patientAddress: patientAddress,
            doctorAddress: doctorAddress,
            id: recordId,
        });
    }
    async rejectRecordAccessRequest(ip, doctorAddress, patientAddress, recordId) {
        this.logger.log(`Reject Record Request\t${ip}`);
        return await this.doctorService.rejectMedicalRecordAccessRequest({
            patientAddress: patientAddress,
            doctorAddress: doctorAddress,
            id: recordId,
        });
    }
    async createMedicalRecordPreview(ip, doctorAddress, patientAddress, createMedicalRecordDto) {
        this.logger.log(`Create Medical Record Request\t${ip}`);
        return await this.doctorService.createMedicalRecord({
            recordId: createMedicalRecordDto.recordId,
            principalPatientAddress: patientAddress,
            doctorAddress: doctorAddress,
            diagnosis: createMedicalRecordDto.diagnosis,
        });
    }
    async swapId(walletAddress, id) {
        return await this.doctorService.swapId(walletAddress, id);
    }
    async deleteAllApprovalRequests(ip, walletAddress) {
        this.logger.log(`Delete All Record Request\t${ip}`);
        return await this.doctorService.deleteAllApprovalRequests(walletAddress);
    }
    async getDoctorByAddress(ip, walletAddress) {
        this.logger.log(`Doctor By Address Request\t${ip}`);
        return await this.doctorService.getDoctorByAddress(walletAddress);
    }
    async getAllDoctors(ip) {
        this.logger.log(`Get All Doctors Request\t${ip}`);
        return await this.doctorService.getAllDoctors();
    }
    async getApprovedDoctors(ip) {
        this.logger.log(`Get Approved Doctors Request\t${ip}`);
        return await this.doctorService.getApprovedDoctors();
    }
    async getPendingDoctors(ip) {
        this.logger.log(`Get Pending Doctors Request\t${ip}`);
        return await this.doctorService.getPendingDoctors();
    }
    async getActiveApprovals(ip, doctorAddress) {
        this.logger.log(`Get Active Approval Request\t${ip}`);
        return await this.doctorService.fetchAllActiveApprovals(doctorAddress);
    }
    async deleteDoctorByAddress(ip, walletAddress) {
        this.logger.log(`Delete Doctor Request\t${ip}`);
        return this.doctorService.deleteDoctorByAddress(walletAddress);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)('createDoctor'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "createDoctor", null);
__decorate([
    (0, common_1.Post)('updateDoctor'),
    (0, common_1.UseGuards)(doctor_auth_guard_1.DoctorAuthGuard, doctor_auth_guard_1.DoctorVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "updateDoctor", null);
__decorate([
    (0, common_1.Post)('addPatientPrescription'),
    (0, common_1.UseGuards)(doctor_auth_guard_1.DoctorAuthGuard, doctor_auth_guard_1.DoctorVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, doctor_dto_1.CreatePrescriptionDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addPatientPrescription", null);
__decorate([
    (0, common_1.Post)('approveRecordAccessRequest'),
    (0, common_1.UseGuards)(doctor_auth_guard_1.DoctorAuthGuard, doctor_auth_guard_1.DoctorVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('recordId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "approveRecordAccessRequest", null);
__decorate([
    (0, common_1.Post)('rejectRecordAccessRequest'),
    (0, common_1.UseGuards)(doctor_auth_guard_1.DoctorAuthGuard, doctor_auth_guard_1.DoctorVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('recordId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "rejectRecordAccessRequest", null);
__decorate([
    (0, common_1.Post)('createMedicalRecord'),
    (0, common_1.UseGuards)(doctor_auth_guard_1.DoctorAuthGuard, doctor_auth_guard_1.DoctorVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, doctor_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "createMedicalRecordPreview", null);
__decorate([
    (0, common_1.Post)('swapId'),
    __param(0, (0, common_1.Query)('walletAddress')),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "swapId", null);
__decorate([
    (0, common_1.Post)('deleteAllApprovalRequests'),
    (0, common_1.UseGuards)(doctor_auth_guard_1.DoctorAuthGuard, doctor_auth_guard_1.DoctorVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "deleteAllApprovalRequests", null);
__decorate([
    (0, common_1.Get)('doctorByAddress'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorByAddress", null);
__decorate([
    (0, common_1.Get)('allDoctors'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getAllDoctors", null);
__decorate([
    (0, common_1.Get)('approvedDoctors'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getApprovedDoctors", null);
__decorate([
    (0, common_1.Get)('pendingDoctors'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getPendingDoctors", null);
__decorate([
    (0, common_1.Get)('allRecordRequests'),
    (0, common_1.UseGuards)(doctor_auth_guard_1.DoctorAuthGuard, doctor_auth_guard_1.DoctorVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getActiveApprovals", null);
__decorate([
    (0, common_1.Delete)('deleteDoctor'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "deleteDoctorByAddress", null);
exports.DoctorController = DoctorController = DoctorController_1 = __decorate([
    (0, common_1.Controller)('doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map