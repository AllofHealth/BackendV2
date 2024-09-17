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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("../services/patient.service");
const patient_dto_1 = require("../dto/patient.dto");
const mongoose_1 = require("mongoose");
const patient_auth_guard_1 = require("../guards/patient.auth.guard");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    async createNewPatient(createPatientType) {
        return await this.patientService.createNewPatient(createPatientType);
    }
    async updatePatient(walletAddress, updatePatientDto) {
        return await this.patientService.updatePatient(walletAddress, updatePatientDto);
    }
    async createFamilyMember(walletAddress, createFamilyMemberDto) {
        return await this.patientService.addFamilyMember({
            walletAddress,
            familyMember: createFamilyMemberDto,
        });
    }
    async updateFamilyMember(walletAddress, familyMemberId, updateFamilyMemberDto) {
        return await this.patientService.editFamilyMember({
            walletAddress,
            familyMemberId,
            updateData: updateFamilyMemberDto,
        });
    }
    async sharePrescription(walletAddress, pharmacistAddress, sharePrescriptionDto) {
        return await this.patientService.sharePrescription({
            walletAddress,
            pharmacistAddress,
            prescriptionId: sharePrescriptionDto.prescriptionId,
        });
    }
    async removePrescription(walletAddress, prescriptionId) {
        return await this.patientService.removePrescriptions(walletAddress, prescriptionId);
    }
    async approveMedicalRecordAccess(walletAddress, createApprovalDto) {
        return await this.patientService.approveMedicalRecordAccess({
            recordId: createApprovalDto.recordId,
            patientAddress: walletAddress,
            doctorAddress: createApprovalDto.doctorAddress,
            approvalType: createApprovalDto.approvalType,
            approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
        });
    }
    async approveFamilyMemberRecordAccess(walletAddress, createApprovalDto) {
        return await this.patientService.approveMedicalRecordAccessForFamilyMember({
            recordId: createApprovalDto.recordId,
            familyMemberId: createApprovalDto.familyMemberId,
            patientAddress: walletAddress,
            doctorAddress: createApprovalDto.doctorAddress,
            approvalType: createApprovalDto.approvalType,
            approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
        });
    }
    async getAllPatients() {
        return await this.patientService.findAllPatients();
    }
    async getAllFamilyMembers(walletAddress) {
        return await this.patientService.listFamilyMember(walletAddress);
    }
    async getFamilyMemberById(walletAddress, memberId) {
        return await this.patientService.getFamilyMemberById({
            walletAddress,
            memberId,
        });
    }
    async getPatientByAddress(walletAddress) {
        return await this.patientService.fetchPatientByWalletAddress(walletAddress);
    }
    async getAllPrescriptions(walletAddress) {
        return await this.patientService.fetchAllPrescriptions(walletAddress);
    }
    async getPrescription(walletAddress, prescriptionId) {
        return await this.patientService.fetchPrescription(walletAddress, prescriptionId);
    }
    async getAllMedicalRecords(walletAddress) {
        return await this.patientService.fetchAllMedicalRecords(walletAddress);
    }
    async getFamilyMemberMedicalRecords(principalPatientAddress, familyMemberId) {
        return await this.patientService.fetchAllMedicalRecordsForFamilyMember({
            principalPatientAddress,
            familyMemberId,
        });
    }
    async getMedicalRecord(walletAddress, recordId) {
        return await this.patientService.fetchMedicalRecordById({
            walletAddress,
            recordId,
        });
    }
    async deletePatient(walletAddress) {
        return await this.patientService.deletePatientByAddress(walletAddress);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)('createNewPatient'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "createNewPatient", null);
__decorate([
    (0, common_1.Post)('updatePatient'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.UpdatePatientProfileDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updatePatient", null);
__decorate([
    (0, common_1.Post)('createFamilyMember'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.CreateFamilyMemberDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "createFamilyMember", null);
__decorate([
    (0, common_1.Post)('updateFamilyMember'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('familyMemberId', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, patient_dto_1.UpdateFamilyMemberDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateFamilyMember", null);
__decorate([
    (0, common_1.Post)('sharePrescription'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('pharmacistAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, patient_dto_1.SharePrescriptionDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "sharePrescription", null);
__decorate([
    (0, common_1.Post)('removePrescription'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('prescriptionId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "removePrescription", null);
__decorate([
    (0, common_1.Post)('approveMedicalRecordAccess'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.CreateApprovalDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "approveMedicalRecordAccess", null);
__decorate([
    (0, common_1.Post)('approveFamilyMemberRecordAccess'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.CreateFamilyMemberApprovalDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "approveFamilyMemberRecordAccess", null);
__decorate([
    (0, common_1.Get)('allPatients'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllPatients", null);
__decorate([
    (0, common_1.Get)('allFamilyMembers'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllFamilyMembers", null);
__decorate([
    (0, common_1.Get)('getFamilyMemberById'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('memberId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getFamilyMemberById", null);
__decorate([
    (0, common_1.Get)('getPatientByAddress'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPatientByAddress", null);
__decorate([
    (0, common_1.Get)('allPrescriptions'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllPrescriptions", null);
__decorate([
    (0, common_1.Get)('prescriptionById'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('prescriptionId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPrescription", null);
__decorate([
    (0, common_1.Get)('allMedicalRecords'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllMedicalRecords", null);
__decorate([
    (0, common_1.Get)('familyMemberMedicalRecords'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('familyMemberId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getFamilyMemberMedicalRecords", null);
__decorate([
    (0, common_1.Get)('medicalRecordById'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getMedicalRecord", null);
__decorate([
    (0, common_1.Delete)('deletePatient'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "deletePatient", null);
exports.PatientController = PatientController = __decorate([
    (0, common_1.Controller)('patient'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map