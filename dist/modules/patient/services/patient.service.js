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
var PatientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const patient_schema_1 = require("../schemas/patient.schema");
const patient_interface_1 = require("../interface/patient.interface");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const patient_dao_1 = require("../dao/patient.dao");
const patient_guard_1 = require("../guards/patient.guard");
const pharmacist_guard_1 = require("../../pharmacist/guards/pharmacist.guard");
const pharmacist_dao_1 = require("../../pharmacist/dao/pharmacist.dao");
const doctor_dao_1 = require("../../doctor/dao/doctor.dao");
const patient_provider_1 = require("../provider/patient.provider");
const constants_1 = require("../../../shared/constants");
const otp_service_1 = require("../../otp/services/otp.service");
const shared_1 = require("../../../shared");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const patient_data_1 = require("../data/patient.data");
const event_emitter_1 = require("@nestjs/event-emitter");
const shared_events_1 = require("../../../shared/events/shared.events");
const shared_dto_1 = require("../../../shared/dto/shared.dto");
let PatientService = PatientService_1 = class PatientService {
    constructor(patientModel, patientDao, patientGuard, pharmacistGuard, pharmacistDao, doctorDao, otpService, eventEmitter) {
        this.patientModel = patientModel;
        this.patientDao = patientDao;
        this.patientGuard = patientGuard;
        this.pharmacistGuard = pharmacistGuard;
        this.pharmacistDao = pharmacistDao;
        this.doctorDao = doctorDao;
        this.otpService = otpService;
        this.eventEmitter = eventEmitter;
        this.logger = new my_logger_service_1.MyLoggerService(PatientService_1.name);
        this.provider = patient_provider_1.PatientProvider.useFactory();
    }
    getApprovalType(approvalType) {
        const upperCaseType = approvalType.toUpperCase();
        if (upperCaseType === patient_interface_1.ApprovalType.FULL) {
            return patient_interface_1.ApprovalType.FULL;
        }
        else if (upperCaseType === patient_interface_1.ApprovalType.READ) {
            return patient_interface_1.ApprovalType.READ;
        }
        throw new shared_1.PatientError('Invalid approval type');
    }
    createApprovalInputs(args) {
        const { id, name, recordIds, profilePicture, approvalType, approvalDuration, recordOwner, recordTag, } = args;
        if (recordIds && recordIds.length > 0) {
            return recordIds.map((recordId) => ({
                patientId: id,
                patientName: name,
                recordId,
                profilePicture: profilePicture,
                approvalType,
                approvalStatus: shared_1.ApprovalStatus.Pending,
                approvalDuration,
                recordOwner,
                recordTag: recordTag,
            }));
        }
        else {
            return [
                {
                    patientId: id,
                    patientName: name,
                    recordId: 0,
                    profilePicture: profilePicture,
                    approvalType,
                    approvalStatus: shared_1.ApprovalStatus.Pending,
                    approvalDuration,
                    recordOwner,
                    recordTag: recordTag,
                },
            ];
        }
    }
    async createNewPatient(args) {
        const { walletAddress } = args;
        try {
            const patientExist = await this.patientGuard.validatePatient(walletAddress);
            if (patientExist) {
                return {
                    success: common_1.HttpStatus.CREATED,
                    message: patient_data_1.PatientErrors.PATIENT_EXISTS,
                };
            }
            const patient = await this.patientDao.createNewPatient(args);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: patient_data_1.PatientErrors.PATIENT_CREATED_ERROR,
                };
            }
            this.eventEmitter.emit(shared_events_1.SharedEvents.ENTITY_CREATED, new shared_dto_1.EntityCreatedDto(walletAddress, args.email, 'patient'));
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.PATIENT_CREATED,
                patient,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.PATIENT_CREATED_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addFamilyMember(args) {
        const { walletAddress, familyMember } = args;
        const { id, name, relationship, email, address, age, dob, bloodGroup, genotype, } = familyMember;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            const sanitizeRelationship = relationship.toLowerCase();
            const sanitizedArgs = {
                id,
                principalPatient: walletAddress,
                name,
                relationship: sanitizeRelationship,
                email,
                address,
                age,
                dob: new Date(dob),
                bloodGroup,
                genotype,
            };
            const familyMemberExist = patient.familyMembers.find((member) => member.id === id);
            if (familyMemberExist) {
                return {
                    success: common_1.HttpStatus.CONFLICT,
                    message: patient_data_1.PatientErrors.FAMILY_MEMBER_EXIST,
                };
            }
            const newFamilyMember = await this.patientDao.createFamilyMembers(sanitizedArgs);
            patient.familyMembers.push(newFamilyMember);
            await patient.save();
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.FAMILY_MEMBER_ADDED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FAMILY_MEMBER_ERROR }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listFamilyMember(walletAddress) {
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            const familyMembers = patient.familyMembers;
            if (!familyMembers) {
                return {
                    success: common_1.HttpStatus.FOUND,
                    message: patient_data_1.PatientErrors.FAMILY_MEMBER_LIST_ERROR,
                    members: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.FAMILY_MEMBER_FOUND,
                members: familyMembers,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FAMILY_MEMBER_FETCH_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getFamilyMemberById(args) {
        const { walletAddress, memberId } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.PATIENT_NOT_FOUND,
                };
            }
            const familyMember = patient.familyMembers;
            const member = familyMember.find((member) => member.id === memberId);
            if (!member) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.FAMILY_MEMBER_LIST_ERROR,
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                member,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FAMILY_MEMBER_FETCH_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async editFamilyMember(args) {
        const { walletAddress, familyMemberId, updateData } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            const familyMemberExists = patient.familyMembers.find((member) => member.id === familyMemberId);
            if (!familyMemberExists) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.FAMILY_MEMBER_NOT_FOUND,
                };
            }
            const familyMember = await this.patientDao.updateFamilyMember(walletAddress, familyMemberId, updateData);
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.FAMILY_MEMBER_UPDATED,
                familyMember,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FAMILY_MEMBER_UPDATE_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllPatients() {
        try {
            const patients = await this.patientModel.find();
            if (!patients) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.PATIENT_NOT_FOUND,
                    data: [],
                };
            }
            return {
                status: common_1.HttpStatus.OK,
                patients,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.PATIENT_FETCH_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchPatientByWalletAddress(walletAddress) {
        try {
            const patientExist = await this.patientGuard.validatePatient(walletAddress);
            if (!patientExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.PATIENT_NOT_FOUND,
                };
            }
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            return {
                success: common_1.HttpStatus.OK,
                patient,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.PATIENT_FETCH_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePatient(walletAddress, args) {
        try {
            await this.patientDao.updatePatient(walletAddress, args);
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.PATIENT_UPDATED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.PATIENT_UPDATE_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePatientByAddress(walletAddress) {
        try {
            const patientExists = await this.patientGuard.validatePatient(walletAddress);
            if (!patientExists) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.PATIENT_NOT_FOUND,
                };
            }
            await this.patientDao.DeletePatient(walletAddress);
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.PATIENT_DELETED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.PATIENT_DELETE_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchAllPrescriptions(walletAddress) {
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            const prescriptions = patient.prescriptions;
            return {
                success: common_1.HttpStatus.OK,
                prescriptions,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FETCH_PRESCRIPTION_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchPrescription(walletAddress, prescriptionId) {
        try {
            const prescription = await this.patientModel.findOne({ walletAddress, 'prescriptions._id': prescriptionId }, { 'prescriptions.$': 1 });
            if (!prescription || !prescription.prescriptions.length) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: `${patient_data_1.PatientErrors.PRESCRIPTION_NOT_FOUND} | ${patient_data_1.PatientErrors.INVALID_PRESCRIPTION_ID}`,
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                prescription: prescription.prescriptions[0],
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FETCH_PRESCRIPTION_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sharePrescription(args) {
        const { walletAddress, pharmacistAddress, prescriptionId } = args;
        try {
            const isPharmacist = await this.pharmacistGuard.validatePharmacistExists(pharmacistAddress);
            if (!isPharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.PHARMACIST_NOT_FOUND,
                };
            }
            const prescription = await this.patientModel.findOne({ walletAddress, 'prescriptions._id': prescriptionId }, { 'prescriptions.$': 1 });
            if (!prescription || !prescription.prescriptions.length) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: `${patient_data_1.PatientErrors.PRESCRIPTION_NOT_FOUND} | ${patient_data_1.PatientErrors.INVALID_PRESCRIPTION_ID}`,
                };
            }
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
            try {
                pharmacist.sharedPrescriptions.push(prescription.prescriptions[0]);
                await pharmacist.save();
            }
            catch (error) {
                return {
                    success: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: patient_data_1.PatientErrors.SHARE_PRESCRIPTION_ERROR,
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.PRESCRIPTION_SHARED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.SHARE_PRESCRIPTION_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removePrescriptions(walletAddress, prescriptionId) {
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            const prescription = patient.prescriptions.find((prescription) => prescription._id == prescriptionId);
            if (!prescription) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.PRESCRIPTION_NOT_FOUND,
                };
            }
            await this.patientDao.pullOnePrescription(prescriptionId, walletAddress);
            await this.patientDao.deletePrescription(prescriptionId);
            await patient.save();
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.PRESCRIPTION_DELETED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.DELETE_PRESCRIPTION_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async approveMedicalRecordAccess(args) {
        const { recordId, patientAddress, doctorAddress, approvalType, approvalDurationInSecs, } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.DOCTOR_NOT_FOUND,
                };
            }
            if (doctor.status !== shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: patient_data_1.PatientErrors.DOCTOR_NOT_APPROVED,
                };
            }
            const sanitizedApprovalType = this.getApprovalType(approvalType);
            const durationTime = this.provider.returnDuration(approvalDurationInSecs);
            const approvalInputs = this.createApprovalInputs({
                id: patient.id,
                name: patient.name,
                recordIds: recordId,
                profilePicture: patient.profilePicture,
                approvalType: sanitizedApprovalType,
                approvalDuration: durationTime,
                recordOwner: patient.walletAddress,
                recordTag: 'patient',
            });
            const approvals = await Promise.all(approvalInputs.map((input) => this.patientDao.createApproval(input)));
            doctor.activeApprovals.push(...approvals);
            doctor.numberOfApprovals += approvals.length;
            await doctor.save();
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.MEDICAL_RECORD_ACCESS_APPROVED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.APPROVE_MEDICAL_RECORD_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async approveMedicalRecordAccessForFamilyMember(args) {
        const { recordId, familyMemberId, patientAddress, doctorAddress, approvalType, approvalDurationInSecs, } = args;
        try {
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.DOCTOR_NOT_FOUND,
                };
            }
            if (doctor.status !== shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: patient_data_1.PatientErrors.DOCTOR_NOT_APPROVED,
                };
            }
            const familyMember = await this.patientDao.fetchPatientFamilyMember(patientAddress, familyMemberId);
            if (!familyMember) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.FAMILY_MEMBER_NOT_FOUND,
                };
            }
            if (familyMember.principalPatient != patientAddress) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: patient_data_1.PatientErrors.INVALID_PRINCIPAL_PATIENT,
                };
            }
            const sanitizedApprovalType = this.getApprovalType(approvalType);
            const durationTime = this.provider.returnDuration(approvalDurationInSecs);
            const approvalInputs = this.createApprovalInputs({
                id: familyMember.id,
                name: familyMember.name,
                recordIds: recordId,
                profilePicture: constants_1.PROFILE_PLACEHOLDER,
                approvalType: sanitizedApprovalType,
                approvalDuration: durationTime,
                recordOwner: familyMember.principalPatient,
                recordTag: 'familyMember',
            });
            const approvals = await Promise.all(approvalInputs.map((input) => this.patientDao.createApproval(input)));
            doctor.activeApprovals = doctor.activeApprovals.concat(approvals);
            doctor.numberOfApprovals += approvals.length;
            await doctor.save();
            return {
                success: common_1.HttpStatus.OK,
                message: patient_data_1.PatientSuccess.FAMILY_MEDICAL_RECORD_ACCESS_APPROVED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.APPROVE_MEDICAL_RECORD_FAMILY }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchAllMedicalRecords(patientAddress) {
        try {
            const patient = await this.fetchPatientByWalletAddress(patientAddress);
            const medicalRecords = patient.patient.medicalRecords;
            if (!medicalRecords) {
                return {
                    success: common_1.HttpStatus.OK,
                    medicalRecords: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                medicalRecords,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FETCH_MEDICAL_RECORD_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchAllMedicalRecordsForFamilyMember(args) {
        const { principalPatientAddress, familyMemberId } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(principalPatientAddress);
            const familyMember = patient.familyMembers.find((member) => member.id === familyMemberId);
            if (!familyMember) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.FAMILY_MEMBER_NOT_FOUND,
                };
            }
            const records = familyMember.medicalRecord;
            return {
                success: common_1.HttpStatus.OK,
                records,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.FETCH_FAMILY_MEDICAL_RECORD }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchMedicalRecordById(args) {
        const { walletAddress, recordId } = args;
        try {
            const record = await this.patientDao.findOneRecord(walletAddress, recordId);
            if (!record) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: patient_data_1.PatientErrors.RECORD_NOT_FOUND,
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                record,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: patient_data_1.PatientErrors.RECORD_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = PatientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_schema_1.Patient.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        patient_dao_1.PatientDao,
        patient_guard_1.PatientGuard,
        pharmacist_guard_1.PharmacistGuard,
        pharmacist_dao_1.PharmacistDao,
        doctor_dao_1.DoctorDao,
        otp_service_1.OtpService,
        event_emitter_1.EventEmitter2])
], PatientService);
//# sourceMappingURL=patient.service.js.map