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
var PatientController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("../services/patient.service");
const patient_dto_1 = require("../dto/patient.dto");
const mongoose_1 = require("mongoose");
const patient_auth_guard_1 = require("../guards/patient.auth.guard");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const swagger_1 = require("@nestjs/swagger");
const patient_data_1 = require("../data/patient.data");
let PatientController = PatientController_1 = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
        this.logger = new my_logger_service_1.MyLoggerService(PatientController_1.name);
    }
    async createNewPatient(ip, createPatientType) {
        this.logger.log(`Create New Patient Request\t${ip}`);
        return await this.patientService.createNewPatient(createPatientType);
    }
    async updatePatient(ip, walletAddress, updatePatientDto) {
        this.logger.log(`Update Patient Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.updatePatient(walletAddress, updatePatientDto);
    }
    async createFamilyMember(ip, walletAddress, createFamilyMemberDto) {
        this.logger.log(`Create Family Member Request\t${ip}\t wallet address ${walletAddress}`);
        return await this.patientService.addFamilyMember({
            walletAddress,
            familyMember: createFamilyMemberDto,
        });
    }
    async updateFamilyMember(ip, walletAddress, familyMemberId, updateFamilyMemberDto) {
        this.logger.log(`Update Family Member Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.editFamilyMember({
            walletAddress,
            familyMemberId,
            updateData: updateFamilyMemberDto,
        });
    }
    async sharePrescription(ip, walletAddress, pharmacistAddress, sharePrescriptionDto) {
        this.logger.log(`Share Prescription Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.sharePrescription({
            walletAddress,
            pharmacistAddress,
            prescriptionId: sharePrescriptionDto.prescriptionId,
        });
    }
    async removePrescription(ip, walletAddress, prescriptionId) {
        this.logger.log(`Remove Prescription Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.removePrescriptions(walletAddress, prescriptionId);
    }
    async approveMedicalRecordAccess(ip, walletAddress, createApprovalDto) {
        this.logger.log(`Approve Medical Record Access Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.approveMedicalRecordAccess({
            recordId: createApprovalDto.recordId,
            patientAddress: walletAddress,
            doctorAddress: createApprovalDto.doctorAddress,
            approvalType: createApprovalDto.approvalType,
            approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
        });
    }
    async approveFamilyMemberRecordAccess(ip, walletAddress, createApprovalDto) {
        this.logger.log(`Approve Family Member Record Access Request\t${ip}\t wallet address ${walletAddress}`);
        return await this.patientService.approveMedicalRecordAccessForFamilyMember({
            recordId: createApprovalDto.recordId,
            familyMemberId: createApprovalDto.familyMemberId,
            patientAddress: walletAddress,
            doctorAddress: createApprovalDto.doctorAddress,
            approvalType: createApprovalDto.approvalType,
            approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
        });
    }
    async getAllPatients(ip) {
        this.logger.log(`Get All Patient Request\t${ip}`);
        return await this.patientService.findAllPatients();
    }
    async getAllFamilyMembers(ip, walletAddress) {
        this.logger.log(`Get All Family Member Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.listFamilyMember(walletAddress);
    }
    async getFamilyMemberById(ip, walletAddress, memberId) {
        this.logger.log(`Get Family Member By Id Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.getFamilyMemberById({
            walletAddress,
            memberId,
        });
    }
    async getPatientByAddress(ip, walletAddress) {
        this.logger.log(`Get Patient By Id Request\t${ip} \t wallet address ${walletAddress}`);
        return await this.patientService.fetchPatientByWalletAddress(walletAddress);
    }
    async getAllPrescriptions(ip, walletAddress) {
        this.logger.log(`Get All Prescriptions Request\t${ip}`);
        return await this.patientService.fetchAllPrescriptions(walletAddress);
    }
    async getPrescription(ip, walletAddress, prescriptionId) {
        this.logger.log(`Get Prescription By Id Request\t${ip}`);
        return await this.patientService.fetchPrescription(walletAddress, prescriptionId);
    }
    async getAllMedicalRecords(ip, walletAddress) {
        this.logger.log(`Get All Medical Record Request\t${ip}`);
        return await this.patientService.fetchAllMedicalRecords(walletAddress);
    }
    async getFamilyMemberMedicalRecords(ip, principalPatientAddress, familyMemberId) {
        this.logger.log(`Get Family Member Request\t${ip}`);
        return await this.patientService.fetchAllMedicalRecordsForFamilyMember({
            principalPatientAddress,
            familyMemberId,
        });
    }
    async getFamilyMemberRecordById(ip, principalPatientAddress, familyMemberId, recordId) {
        this.logger.log(`Get Family Member record by id Request\t${ip}`);
        return await this.patientService.fetchFamilyMemberRecordById({
            principalPatientAddress,
            familyMemberId,
            recordId,
        });
    }
    async getMedicalRecord(ip, walletAddress, recordId) {
        this.logger.log(`Get Medical Record By Id Request\t${ip}`);
        return await this.patientService.fetchMedicalRecordById({
            walletAddress,
            recordId,
        });
    }
    async deletePatient(ip, walletAddress) {
        this.logger.log(`Delete Patient Request\t${ip}`);
        return await this.patientService.deletePatientByAddress(walletAddress);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)('createNewPatient'),
    (0, swagger_1.ApiOperation)({ summary: 'creates a new patient document' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.PATIENT_CREATED,
        type: patient_dto_1.PatientDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: patient_data_1.PatientErrors.PATIENT_CREATED_ERROR,
    }),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "createNewPatient", null);
__decorate([
    (0, common_1.Post)('updatePatient'),
    (0, swagger_1.ApiOperation)({ summary: 'update a patient document' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.PATIENT_UPDATED,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.PATIENT_UPDATE_ERROR,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, patient_dto_1.UpdatePatientProfileDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updatePatient", null);
__decorate([
    (0, common_1.Post)('createFamilyMember'),
    (0, swagger_1.ApiOperation)({ summary: 'creates a family member document' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.FAMILY_MEMBER_ADDED,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.FAMILY_MEMBER_ERROR,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, patient_dto_1.CreateFamilyMemberDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "createFamilyMember", null);
__decorate([
    (0, common_1.Post)('updateFamilyMember'),
    (0, swagger_1.ApiOperation)({ summary: 'updates a family member document' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.FAMILY_MEMBER_UPDATED,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.FAMILY_MEMBER_UPDATE_ERROR,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('familyMemberId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, patient_dto_1.UpdateFamilyMemberDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "updateFamilyMember", null);
__decorate([
    (0, common_1.Post)('sharePrescription'),
    (0, swagger_1.ApiOperation)({ summary: 'share prescription to a pharmacist' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'pharmacistAddress',
        description: 'an approved pharmacist ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.PRESCRIPTION_SHARED,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.SHARE_PRESCRIPTION_ERROR,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('pharmacistAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, patient_dto_1.SharePrescriptionDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "sharePrescription", null);
__decorate([
    (0, common_1.Post)('removePrescription'),
    (0, swagger_1.ApiOperation)({ summary: 'removes a patient prescription' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'prescriptionId',
        description: 'prescription mongo id',
        type: mongoose_1.Types.ObjectId,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.PRESCRIPTION_DELETED,
        isArray: false,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.PATIENT_DELETE_ERROR,
        isArray: false,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('prescriptionId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "removePrescription", null);
__decorate([
    (0, common_1.Post)('approveMedicalRecordAccess'),
    (0, swagger_1.ApiOperation)({ summary: 'approve access to medical record' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.MEDICAL_RECORD_ACCESS_APPROVED,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.APPROVE_MEDICAL_RECORD_ERROR,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, patient_dto_1.CreateApprovalDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "approveMedicalRecordAccess", null);
__decorate([
    (0, common_1.Post)('approveFamilyMemberRecordAccess'),
    (0, swagger_1.ApiOperation)({ summary: 'approve access to family member medical record' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.FAMILY_MEDICAL_RECORD_ACCESS_APPROVED,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.APPROVE_MEDICAL_RECORD_FAMILY,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, patient_dto_1.CreateFamilyMemberApprovalDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "approveFamilyMemberRecordAccess", null);
__decorate([
    (0, common_1.Get)('allPatients'),
    (0, swagger_1.ApiOperation)({ summary: 'returns all patients documents' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        isArray: true,
        type: [patient_dto_1.PatientDto],
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.PATIENT_FETCH_ERROR,
    }),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllPatients", null);
__decorate([
    (0, common_1.Get)('allFamilyMembers'),
    (0, swagger_1.ApiOperation)({
        summary: 'returns all family members associated with an ethereum address',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.FAMILY_MEMBER_FOUND,
        isArray: true,
        type: [patient_dto_1.FamilyMemberDto],
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.FAMILY_MEMBER_FETCH_ERROR,
    }),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllFamilyMembers", null);
__decorate([
    (0, common_1.Get)('getFamilyMemberById'),
    (0, swagger_1.ApiOperation)({
        summary: 'returns a family members associated with an blockchain identifier',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'memberId',
        description: 'family member blockchain id',
        type: Number,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: patient_data_1.PatientSuccess.FAMILY_MEMBER_FOUND,
        type: patient_dto_1.FamilyMemberDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.FAMILY_MEMBER_FETCH_ERROR,
    }),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('memberId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getFamilyMemberById", null);
__decorate([
    (0, common_1.Get)('getPatientByAddress'),
    (0, swagger_1.ApiOperation)({ summary: 'returns a patient document' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'patient ethereum address',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        isArray: false,
        type: patient_dto_1.PatientDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: patient_data_1.PatientErrors.PATIENT_FETCH_ERROR,
    }),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPatientByAddress", null);
__decorate([
    (0, common_1.Get)('allPrescriptions'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllPrescriptions", null);
__decorate([
    (0, common_1.Get)('prescriptionById'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('prescriptionId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPrescription", null);
__decorate([
    (0, common_1.Get)('allMedicalRecords'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllMedicalRecords", null);
__decorate([
    (0, common_1.Get)('familyMemberMedicalRecords'),
    (0, common_1.UseGuards)(patient_auth_guard_1.FamilyMemberGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('principalPatientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('familyMemberId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getFamilyMemberMedicalRecords", null);
__decorate([
    (0, common_1.Get)('familyMemberRecordById'),
    (0, common_1.UseGuards)(patient_auth_guard_1.FamilyMemberGuard),
    (0, swagger_1.ApiOperation)({ summary: 'fetch a family member record' }),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('principalPatientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('familyMemberId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('recordId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getFamilyMemberRecordById", null);
__decorate([
    (0, common_1.Get)('medicalRecordById'),
    (0, common_1.UseGuards)(patient_auth_guard_1.PatientAuthGuard, patient_auth_guard_1.PatientVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getMedicalRecord", null);
__decorate([
    (0, common_1.Delete)('deletePatient'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "deletePatient", null);
exports.PatientController = PatientController = PatientController_1 = __decorate([
    (0, swagger_1.ApiTags)('patient'),
    (0, common_1.Controller)('patient'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map