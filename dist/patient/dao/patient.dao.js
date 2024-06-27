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
exports.PatientDao = void 0;
const patient_schema_1 = require("../schemas/patient.schema");
const shared_1 = require("../../shared");
const constants_1 = require("../../shared/constants");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const doctor_schema_1 = require("../../doctor/schema/doctor.schema");
let PatientDao = class PatientDao {
    constructor(patientModel, familyMemberModel, prescriptionsModel, approvalModel, doctorModel, medicalRecordPreviewModel) {
        this.patientModel = patientModel;
        this.familyMemberModel = familyMemberModel;
        this.prescriptionsModel = prescriptionsModel;
        this.approvalModel = approvalModel;
        this.doctorModel = doctorModel;
        this.medicalRecordPreviewModel = medicalRecordPreviewModel;
    }
    async createNewPatient(patient) {
        return await this.patientModel.create({
            id: patient.id,
            appointmentCount: 0,
            name: patient.name,
            age: patient.age,
            email: patient.email,
            profilePicture: patient.profilePicture
                ? patient.profilePicture
                : constants_1.PROFILE_PLACEHOLDER,
            address: patient.address,
            city: patient.city,
            walletAddress: patient.walletAddress,
            bloodGroup: patient.bloodGroup,
            genotype: patient.genotype,
            category: shared_1.Category.Patient,
        });
    }
    async createFamilyMembers(familyMember) {
        return await this.familyMemberModel.create({
            id: familyMember.id,
            principalPatient: familyMember.principalPatient,
            name: familyMember.name,
            profilePicture: familyMember.profilePicture
                ? familyMember.profilePicture
                : constants_1.PROFILE_PLACEHOLDER,
            relationship: familyMember.relationship,
            email: familyMember.email ? familyMember.email : '',
            address: familyMember.address,
            age: familyMember.age,
            dob: familyMember.dob,
            bloodGroup: familyMember.bloodGroup,
            genotype: familyMember.genotype,
        });
    }
    async createPrescription(prescription) {
        return await this.prescriptionsModel.create({
            doctorName: prescription.doctorName,
            recordId: prescription.recordId,
            patientAddress: prescription.patientAddress,
            doctorAddress: prescription.doctorAddress,
            medicineName: prescription.medicineName,
            medicineId: prescription.medicineId ? prescription.medicineId : '',
            medicineGroup: prescription.medicineGroup
                ? prescription.medicineGroup
                : '',
            description: prescription.description,
            sideEffects: prescription.sideEffects ? prescription.sideEffects : '',
        });
    }
    async createApproval(args) {
        return await this.approvalModel.create({
            patientId: args.patientId,
            patientName: args.patientName,
            recordId: args.recordId,
            profilePicture: args.profilePicture,
            approvalType: args.approvalType,
            approvalStatus: args.approvalStatus,
            approvalDuration: args.approvalDuration,
            recordOwner: args.recordOwner,
            recordTag: args.recordTag,
        });
    }
    async createMedicalRecordPreview(args) {
        return await this.medicalRecordPreviewModel.create({
            id: args.recordId,
            principalPatient: args.principalPatientAddress,
            doctorAddress: args.doctorAddress,
            diagnosis: args.diagnosis,
            doctorsName: args.doctorsName,
            hospitalName: args.hospitalName,
            date: Date.now(),
        });
    }
    async fetchPatientByAddress(walletAddress) {
        return await this.patientModel.findOne({ walletAddress });
    }
    async fetchPatientFamilyMember(walletAddress, familyMemberId) {
        return await this.familyMemberModel.findOne({
            principalPatient: walletAddress,
            id: familyMemberId,
        });
    }
    async fetchAllPatients() {
        return await this.patientModel.find();
    }
    async pullOnePrescription(prescriptionId, walletAddress) {
        return await this.patientModel.updateOne({ walletAddress: walletAddress }, { $pull: { prescriptions: { _id: prescriptionId } } });
    }
    async pullOneApproval(doctorAddress, patientAddress, recordId) {
        return await this.doctorModel.updateOne({ walletAddress: doctorAddress }, {
            $pull: {
                activeApprovals: {
                    recordOwner: patientAddress,
                    _id: recordId,
                },
            },
        });
    }
    async pullPatientApprovals(doctorAddress, patientAddress) {
        return await this.doctorModel.updateOne({ walletAddress: doctorAddress }, {
            $pull: {
                activeApprovals: {
                    recordOwner: patientAddress,
                },
            },
        });
    }
    async updatePatient(walletAddress, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            if (updateData[key] !== undefined) {
                acc[key] = updateData[key];
            }
            return acc;
        }, {});
        return await this.patientModel.updateOne({ walletAddress }, { $set: updates }, { new: true, runValidators: true });
    }
    async updatePatientPrescription(walletAddress, recordId, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            acc[`prescriptions.$.${key}`] = updateData[key];
            return acc;
        }, {});
        return await this.patientModel.updateOne({ walletAddress, 'prescriptions.recordId': recordId }, { $set: updates }, { new: true, runValidators: true });
    }
    async updateFamilyMember(walletAddress, familyMemberId, updateData) {
        const updates = Object.keys(updateData).reduce((acc, key) => {
            acc[`familyMembers.$.${key}`] = updateData[key];
            return acc;
        }, {});
        return await this.patientModel.updateOne({ walletAddress, 'familyMembers.id': familyMemberId }, { $set: updates }, { new: true, runValidators: true });
    }
    async DeletePatient(walletAddress) {
        return await this.patientModel.deleteOne({ walletAddress });
    }
    async findOneRecord(walletAddress, recordId) {
        const record = await this.patientModel.findOne({ walletAddress, 'medicalRecords.recordId': recordId }, { 'medicalRecords.$': 1 });
        if (!record) {
            return {
                success: common_1.HttpStatus.NOT_FOUND,
                message: 'Record not found',
            };
        }
        return record.medicalRecords[0];
    }
    async findOneFamilyMemberRecord(principalPatientAddress, familyMemberId, recordId) {
        const record = await this.patientModel.findOne({
            walletAddress: principalPatientAddress,
            'familyMembers.id': familyMemberId,
            'medicalRecords.recordId': recordId,
        }, { 'medicalRecords.$': 1 });
        if (!record) {
            return {
                success: common_1.HttpStatus.NOT_FOUND,
                message: 'Record not found',
            };
        }
        return record.medicalRecords[0];
    }
};
exports.PatientDao = PatientDao;
exports.PatientDao = PatientDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_schema_1.Patient.name)),
    __param(1, (0, mongoose_1.InjectModel)(patient_schema_1.FamilyMember.name)),
    __param(2, (0, mongoose_1.InjectModel)(patient_schema_1.Prescriptions.name)),
    __param(3, (0, mongoose_1.InjectModel)(doctor_schema_1.Approval.name)),
    __param(4, (0, mongoose_1.InjectModel)(doctor_schema_1.Doctor.name)),
    __param(5, (0, mongoose_1.InjectModel)(patient_schema_1.MedicalRecordPreview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PatientDao);
//# sourceMappingURL=patient.dao.js.map