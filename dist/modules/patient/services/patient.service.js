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
let PatientService = class PatientService {
    constructor(patientModel, patientDao, patientGuard, pharmacistGuard, pharmacistDao, doctorDao, otpService) {
        this.patientModel = patientModel;
        this.patientDao = patientDao;
        this.patientGuard = patientGuard;
        this.pharmacistGuard = pharmacistGuard;
        this.pharmacistDao = pharmacistDao;
        this.doctorDao = doctorDao;
        this.otpService = otpService;
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
                    message: 'patient already exist',
                };
            }
            const patient = await this.patientDao.createNewPatient(args);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'An error occurred while creating patient',
                };
            }
            try {
                await this.otpService.deliverOtp(walletAddress, args.email);
            }
            catch (error) {
                console.error(error);
                throw new Error('An error occurred while creating patient');
            }
            return {
                success: common_1.HttpStatus.OK,
                patient,
                message: 'Patient created successfully',
            };
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new shared_1.PatientError('An error occurred while creating patient');
        }
    }
    async addFamilyMember(args) {
        const { walletAddress, familyMember } = args;
        const { id, name, relationship, email, address, age, dob, bloodGroup, genotype, } = familyMember;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
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
                    message: 'family member already exist',
                };
            }
            const newFamilyMember = await this.patientDao.createFamilyMembers(sanitizedArgs);
            patient.familyMembers.push(newFamilyMember);
            await patient.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'Family member added successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('An error occurred while adding family member');
        }
    }
    async listFamilyMember(walletAddress) {
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            const familyMembers = patient.familyMembers;
            if (!familyMembers) {
                return {
                    success: common_1.HttpStatus.FOUND,
                    members: [],
                    message: 'No family members added',
                };
            }
            return {
                success: common_1.HttpStatus.FOUND,
                members: familyMembers,
                message: 'Family members found',
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('An error occurred while listing family member');
        }
    }
    async getFamilyMemberById(args) {
        const { walletAddress, memberId } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            const familyMember = patient.familyMembers;
            const member = familyMember.find((member) => member.id === memberId);
            if (!member) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Member not found',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                member,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('an error occurred while fetching family member');
        }
    }
    async editFamilyMember(args) {
        const { walletAddress, familyMemberId, updateData } = args;
        try {
            const patientExist = await this.patientGuard.validatePatient(walletAddress);
            if (!patientExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            const familyMemberExists = patient.familyMembers.find((member) => member.id === familyMemberId);
            if (!familyMemberExists) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Family member not found',
                };
            }
            const familyMember = await this.patientDao.updateFamilyMember(walletAddress, familyMemberId, updateData);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Family member updated successfully',
                familyMember,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('An error occurred while editing family member');
        }
    }
    async findAllPatients() {
        return await this.patientModel.find();
    }
    async fetchPatientByWalletAddress(walletAddress) {
        try {
            const patientExist = await this.patientGuard.validatePatient(walletAddress);
            if (!patientExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            return {
                success: shared_1.ErrorCodes.Success,
                patient,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_2.MongooseError)
                throw new mongoose_2.MongooseError(error.message);
            throw new shared_1.PatientError('An error occurred while fetching patient');
        }
    }
    async updatePatient(walletAddress, args) {
        try {
            const patientExist = await this.patientGuard.validatePatient(walletAddress);
            if (!patientExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            await this.patientDao.updatePatient(walletAddress, args);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Patient updated successfully',
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_2.MongooseError)
                throw new mongoose_2.MongooseError(error.message);
            throw new shared_1.PatientError('An error occurred while updating patient');
        }
    }
    async deletePatientByAddress(walletAddress) {
        try {
            const patientExists = await this.patientGuard.validatePatient(walletAddress);
            if (!patientExists) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            await this.patientModel.deleteOne({ walletAddress });
            return {
                success: common_1.HttpStatus.OK,
                message: 'Patient deleted successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('An error occurred while deleting patient');
        }
    }
    async fetchAllPrescriptions(walletAddress) {
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            const prescriptions = patient.prescriptions;
            return {
                success: common_1.HttpStatus.OK,
                prescriptions,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('An error occurred while fetching prescriptions');
        }
    }
    async fetchPrescription(walletAddress, prescriptionId) {
        try {
            const isPatient = await this.patientGuard.validatePatient(walletAddress);
            if (!isPatient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const prescription = await this.patientModel.findOne({ walletAddress, 'prescriptions._id': prescriptionId }, { 'prescriptions.$': 1 });
            if (!prescription || !prescription.prescriptions.length) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'prescription not found, invalid id',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                prescription: prescription.prescriptions[0],
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('An error occurred while fetching prescription');
        }
    }
    async sharePrescription(args) {
        const { walletAddress, pharmacistAddress, prescriptionId } = args;
        try {
            const isPharmacist = await this.pharmacistGuard.validatePharmacistExists(pharmacistAddress);
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (!isPharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Pharmacist not found',
                };
            }
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            const prescription = await this.patientModel.findOne({ walletAddress, 'prescriptions._id': prescriptionId }, { 'prescriptions.$': 1 });
            if (!prescription || !prescription.prescriptions.length) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'prescription not found, invalid id',
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
                    message: 'an error occurred, please try again',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                message: 'prescription shared successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('An error occurred while sharing prescription');
        }
    }
    async removePrescriptions(walletAddress, prescriptionId) {
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const prescription = patient.prescriptions.find((prescription) => prescription._id == prescriptionId);
            if (!prescription) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'prescription not found',
                };
            }
            await this.patientDao.pullOnePrescription(prescriptionId, walletAddress);
            await patient.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'successfully deleted prescription',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('an error occurred while removing prescription');
        }
    }
    async approveMedicalRecordAccess(args) {
        const { recordId, patientAddress, doctorAddress, approvalType, approvalDurationInSecs, } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'doctor not found',
                };
            }
            if (doctor.status !== shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'doctor is not approved',
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
                message: 'approval request sent',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('an error occurred while approving medical record access');
        }
    }
    async approveMedicalRecordAccessForFamilyMember(args) {
        const { recordId, familyMemberId, patientAddress, doctorAddress, approvalType, approvalDurationInSecs, } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'doctor not found',
                };
            }
            if (doctor.status !== shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'doctor is not approved',
                };
            }
            const familyMember = await this.patientDao.fetchPatientFamilyMember(patientAddress, familyMemberId);
            if (!familyMember) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'family member not found',
                };
            }
            if (familyMember.principalPatient != patientAddress) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'invalid principal patient address',
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
                message: 'family member approval request sent',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('an error occurred while approving family member medical record access');
        }
    }
    async fetchAllMedicalRecords(patientAddress) {
        try {
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const medicalRecords = patient.medicalRecords;
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
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('an error occurred while fetching medical records');
        }
    }
    async fetchAllMedicalRecordsForFamilyMember(args) {
        const { principalPatientAddress, familyMemberId } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(principalPatientAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const familyMember = patient.familyMembers.find((member) => member.id === familyMemberId);
            if (!familyMember) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'family member not found',
                };
            }
            const records = familyMember.medicalRecord;
            return {
                success: common_1.HttpStatus.OK,
                records,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('An error occurred while fetch family member records');
        }
    }
    async fetchMedicalRecordById(args) {
        const { walletAddress, recordId } = args;
        try {
            const isPatient = await this.patientGuard.validatePatient(walletAddress);
            if (!isPatient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const record = await this.patientDao.findOneRecord(walletAddress, recordId);
            if (!record) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'record not found',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                record,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PatientError('an error occurred while fetching medical record');
        }
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_schema_1.Patient.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        patient_dao_1.PatientDao,
        patient_guard_1.PatientGuard,
        pharmacist_guard_1.PharmacistGuard,
        pharmacist_dao_1.PharmacistDao,
        doctor_dao_1.DoctorDao,
        otp_service_1.OtpService])
], PatientService);
//# sourceMappingURL=patient.service.js.map