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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("../services/doctor.service");
const doctor_dto_1 = require("../dto/doctor.dto");
const mongoose_1 = require("mongoose");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    async createDoctor(createDoctorDto) {
        return await this.doctorService.createDoctor(createDoctorDto);
    }
    async updateDoctor(walletAddress, updateDoctorDto) {
        return await this.doctorService.updateDoctor(walletAddress, updateDoctorDto);
    }
    async addPatientPrescription(patientAddress, doctorAddress, prescriptionDto) {
        return await this.doctorService.createPrescription({
            recordId: prescriptionDto.recordId,
            patientAddress,
            doctorAddress,
            medicine: prescriptionDto.medicine,
        });
    }
    async approveRecordAccessRequest(patientAddress, doctorAddress, recordId) {
        return await this.doctorService.approveMedicalRecordAccessRequest({
            patientAddress: patientAddress,
            doctorAddress: doctorAddress,
            id: recordId,
        });
    }
    async rejectRecordAccessRequest(patientAddress, doctorAddress, recordId) {
        return await this.doctorService.rejectMedicalRecordAccessRequest({
            patientAddress: patientAddress,
            doctorAddress: doctorAddress,
            id: recordId,
        });
    }
    async createMedicalRecordPreview(patientAddress, doctorAddress, createMedicalRecordDto) {
        return await this.doctorService.createMedicalRecord({
            recordId: createMedicalRecordDto.recordId,
            principalPatientAddress: patientAddress,
            doctorAddress: doctorAddress,
            diagnosis: createMedicalRecordDto.diagnosis,
        });
    }
    async deleteAllApprovalRequests(walletAddress) {
        return await this.doctorService.deleteAllApprovalRequests(walletAddress);
    }
    async getDoctorByAddress(walletAddress) {
        return await this.doctorService.getDoctorByAddress(walletAddress);
    }
    async getAllDoctors() {
        return await this.doctorService.getAllDoctors();
    }
    async getApprovedDoctors() {
        return await this.doctorService.getApprovedDoctors();
    }
    async getPendingDoctors() {
        return await this.doctorService.getPendingDoctors();
    }
    async getActiveApprovals(doctorAddress) {
        return await this.doctorService.fetchAllActiveApprovals(doctorAddress);
    }
    async deleteDoctorByAddress(walletAddress) {
        return this.doctorService.deleteDoctorByAddress(walletAddress);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)('createDoctor'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "createDoctor", null);
__decorate([
    (0, common_1.Post)('updateDoctor'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "updateDoctor", null);
__decorate([
    (0, common_1.Post)('addPatientPrescription'),
    __param(0, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, doctor_dto_1.CreatePrescriptionDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addPatientPrescription", null);
__decorate([
    (0, common_1.Post)('approveRecordAccessRequest'),
    __param(0, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('recordId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "approveRecordAccessRequest", null);
__decorate([
    (0, common_1.Post)('rejectRecordAccessRequest'),
    __param(0, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('recordId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "rejectRecordAccessRequest", null);
__decorate([
    (0, common_1.Post)('createMedicalRecordPreview'),
    __param(0, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, doctor_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "createMedicalRecordPreview", null);
__decorate([
    (0, common_1.Post)('deleteAllApprovalRequests'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "deleteAllApprovalRequests", null);
__decorate([
    (0, common_1.Get)('doctorByAddress'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorByAddress", null);
__decorate([
    (0, common_1.Get)('allDoctors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getAllDoctors", null);
__decorate([
    (0, common_1.Get)('approvedDoctors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getApprovedDoctors", null);
__decorate([
    (0, common_1.Get)('pendingDoctors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getPendingDoctors", null);
__decorate([
    (0, common_1.Get)('allRecordRequests'),
    __param(0, (0, common_1.Query)('doctorAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getActiveApprovals", null);
__decorate([
    (0, common_1.Delete)('deleteDoctor'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "deleteDoctorByAddress", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map