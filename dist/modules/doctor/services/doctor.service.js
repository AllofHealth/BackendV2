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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const doctor_dao_1 = require("../dao/doctor.dao");
const shared_1 = require("../../../shared");
const doctor_guard_1 = require("../guards/doctor.guard");
const hospital_dao_1 = require("../../hospital/dao/hospital.dao");
const patient_dao_1 = require("../../patient/dao/patient.dao");
const patient_guard_1 = require("../../patient/guards/patient.guard");
const medicine_dao_1 = require("../../medicine/dao/medicine.dao");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const shared_events_1 = require("../../../shared/events/shared.events");
const shared_dto_1 = require("../../../shared/dto/shared.dto");
let DoctorService = class DoctorService {
    constructor(doctorDao, doctorGuard, hospitalDao, patientDao, patientGuard, medicineDao, eventEmitter) {
        this.doctorDao = doctorDao;
        this.doctorGuard = doctorGuard;
        this.hospitalDao = hospitalDao;
        this.patientDao = patientDao;
        this.patientGuard = patientGuard;
        this.medicineDao = medicineDao;
        this.eventEmitter = eventEmitter;
        this.logger = new my_logger_service_1.MyLoggerService('DoctorService');
    }
    async getPendingDoctors() {
        try {
            const doctors = await this.doctorDao.fetchDoctorWithPendingStatus();
            if (!doctors) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    doctors: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                doctors,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError) {
                throw new mongoose_1.MongooseError(error.message);
            }
            throw new shared_1.DoctorError('Error fetching doctors');
        }
    }
    async getApprovedDoctors() {
        try {
            const doctors = await this.doctorDao.fetchDoctorWithApprovedStatus();
            if (!doctors) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    doctors: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                doctors,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError) {
                throw new mongoose_1.MongooseError(error.message);
            }
            throw new shared_1.DoctorError('Error fetching approved doctors');
        }
    }
    async createDoctor(args) {
        const doctorExist = await this.doctorGuard.validateDoctorExists(args.walletAddress);
        if (doctorExist) {
            return {
                success: common_1.HttpStatus.CREATED,
                message: 'Doctor already exists',
            };
        }
        if (await this.doctorGuard.validateDoctorExistsInHospital(args.hospitalIds, args.walletAddress)) {
            return {
                success: common_1.HttpStatus.BAD_REQUEST,
                message: 'Doctor already exists in hospital',
            };
        }
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(args.hospitalIds);
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Hospital not found',
                };
            }
            const doctor = await this.doctorDao.createNewDoctor(args);
            if (args.walletAddress === hospital.admin) {
                doctor.status = shared_1.ApprovalStatus.Approved;
                await doctor.save();
            }
            try {
                doctor.hospitalIds.push(args.hospitalIds);
            }
            catch (error) {
                await this.doctorDao.deleteDoctor(args.walletAddress);
                throw new Error('Error adding doctor');
            }
            const doctorPreview = {
                id: doctor.id,
                walletAddress: doctor.walletAddress,
                hospitalIds: doctor.hospitalIds,
                profilePicture: doctor.profilePicture,
                name: doctor.name,
                status: doctor.status,
                category: shared_1.Category.Doctor,
            };
            try {
                hospital.doctors.push(doctorPreview);
                this.eventEmitter.emit(shared_events_1.SharedEvents.ENTITY_CREATED, new shared_dto_1.EntityCreatedDto(args.walletAddress, doctor.email, 'doctor'));
            }
            catch (error) {
                await this.doctorDao.deleteDoctor(args.walletAddress);
                return {
                    success: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Error adding doctor to hospital',
                };
            }
            await doctor.save();
            await hospital.save();
            return {
                success: common_1.HttpStatus.OK,
                doctor,
                message: 'Doctor created successfully',
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError) {
                throw new mongoose_1.MongooseError(error.message);
            }
            throw new shared_1.DoctorError('Error creating doctor');
        }
    }
    async getDoctorByAddress(address) {
        if (!address || address.length !== 42) {
            throw new Error('Invalid address');
        }
        try {
            const doctor = await this.doctorDao.fetchDoctorByAddress(address);
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: "Doctor doesn't exist",
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                doctor,
            };
        }
        catch (error) {
            console.error(error.message);
            throw new shared_1.DoctorError('error fetching doctor by address');
        }
    }
    async getAllDoctors() {
        try {
            const allDoctors = await this.doctorDao.fetchAllDoctors();
            if (!allDoctors) {
                return {
                    success: common_1.HttpStatus.FOUND,
                    allDoctors: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                allDoctors,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError)
                throw new mongoose_1.MongooseError(error.message);
            throw new shared_1.DoctorError('error fetching all doctors');
        }
    }
    async updateDoctor(walletAddress, args) {
        try {
            const doctorExist = await this.doctorGuard.validateDoctorExists(walletAddress);
            if (!doctorExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Doctor not found',
                };
            }
            const doctor = await this.doctorDao.updateDoctor(walletAddress, args);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Doctor updated successfully',
                doctor,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError)
                throw new mongoose_1.MongooseError(error.message);
            throw new shared_1.DoctorError('Error updating doctor');
        }
    }
    async deleteDoctorByAddress(address) {
        try {
            const doctorExist = await this.doctorGuard.validateDoctorExists(address);
            if (!doctorExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Doctor not found',
                };
            }
            const doctor = await this.doctorDao.fetchDoctorByAddress(address);
            const hospitalIds = doctor.hospitalIds;
            await this.hospitalDao.pullManyDoctors(hospitalIds, address);
            await this.doctorDao.deleteDoctor(address);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Doctor deleted successfully',
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError)
                throw new mongoose_1.MongooseError(error.message);
            throw new common_1.InternalServerErrorException('Error deleting doctor');
        }
    }
    async addMedication(args) {
        try {
            const medication = await this.medicineDao.createMedicine(args);
            if (!medication) {
                throw new common_1.HttpException({ message: 'An error occurred creating a new medication' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return medication;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: 'An error occurred while adding medication' }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createPrescription(args) {
        const { recordId, patientAddress, doctorAddress, medicine } = args;
        try {
            const isPatient = await this.patientGuard.validatePatient(patientAddress);
            if (!isPatient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                };
            }
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            const hospitalId = doctor.hospitalIds[0];
            const institution = await this.hospitalDao.fetchHospitalWithBlockchainId(hospitalId);
            if (!institution) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Hospital not found',
                };
            }
            const medicationPromises = medicine.map(async (med) => {
                return await this.addMedication(med);
            });
            const medication = await Promise.all(medicationPromises);
            console.log(medication);
            const newPrescriptionArgs = {
                recordId: recordId,
                doctorName: doctor.name,
                doctorAddress: doctorAddress,
                institutionName: institution.name,
                patientName: patient.name,
                patientAddress: patientAddress,
                medicine: medication,
            };
            this.logger.log(medication);
            const prescription = await this.patientDao.createPrescription(newPrescriptionArgs);
            patient.prescriptions.push(prescription);
            await patient.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'Prescription created successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.DoctorError('Error creating prescription');
        }
    }
    async approveMedicalRecordAccessRequest(args) {
        const { patientAddress, doctorAddress, id } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            if (!doctor.activeApprovals.length) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'no pending approvals',
                };
            }
            const request = doctor.activeApprovals.find((approval) => approval._id == id);
            if (!request) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'approval request not found',
                };
            }
            if (request.approvalStatus === shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'approval request already approved',
                };
            }
            request.approvalStatus = shared_1.ApprovalStatus.Approved;
            patient.appointmentCount++;
            await patient.save();
            await doctor.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'Record access request accepted',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.DoctorError('An error occurred while approving record access request');
        }
    }
    async fetchAllActiveApprovals(doctorAddress) {
        try {
            const isDoctor = await this.doctorGuard.validateDoctorExists(doctorAddress);
            if (!isDoctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Doctor not found',
                };
            }
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            const approvals = doctor.activeApprovals;
            if (!approvals.length) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'No active approvals',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                approvals,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.DoctorError('An error occurred while fetching all active approvals');
        }
    }
    async rejectMedicalRecordAccessRequest(args) {
        const { patientAddress, doctorAddress, id } = args;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            if (!doctor.activeApprovals.length) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'no pending approvals',
                };
            }
            const request = doctor.activeApprovals.find((approval) => approval._id == id);
            if (!request) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'approval request not found',
                };
            }
            await this.patientDao.pullOneApproval(doctorAddress, patientAddress, id);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Record access request rejected',
            };
        }
        catch (error) {
            console.error(error);
        }
    }
    async createMedicalRecord(args) {
        const { recordId, principalPatientAddress, doctorAddress, diagnosis } = args;
        try {
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(doctor.hospitalIds[0]);
            const patient = await this.patientDao.fetchPatientByAddress(principalPatientAddress);
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'doctor not found',
                };
            }
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'doctor is not associated with any hospital',
                };
            }
            if (!patient) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'patient not found',
                };
            }
            const approvalRequest = doctor.activeApprovals.find((approval) => approval.recordOwner == principalPatientAddress);
            if (!approvalRequest) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'approval request not found',
                };
            }
            if (approvalRequest.approvalStatus !== shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'approval request not approved, accept the approval first',
                };
            }
            const currentTime = new Date();
            if (currentTime > approvalRequest.approvalDuration) {
                try {
                    await this.patientDao.pullOneApproval(doctorAddress, principalPatientAddress, approvalRequest._id);
                    return {
                        success: common_1.HttpStatus.BAD_REQUEST,
                        message: 'approval request expired, removed request',
                    };
                }
                catch (error) {
                    console.error(error);
                    return {
                        success: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An error occurred while removing approval request',
                    };
                }
            }
            const medicalRecord = await this.patientDao.createMedicalRecordPreview({
                recordId,
                principalPatientAddress,
                doctorAddress,
                diagnosis,
                doctorsName: doctor.name,
                hospitalName: hospital.name,
            });
            if (approvalRequest.recordTag === 'familyMember') {
                const familyMember = patient.familyMembers.find((member) => member.id === approvalRequest.patientId);
                if (!familyMember) {
                    return {
                        success: common_1.HttpStatus.NOT_FOUND,
                        message: 'family member not found',
                    };
                }
                const familyMemberSchema = await this.patientDao.fetchPatientFamilyMember(principalPatientAddress, approvalRequest.patientId);
                if (!familyMember) {
                    return {
                        success: common_1.HttpStatus.NOT_FOUND,
                        message: 'family member not found',
                    };
                }
                familyMemberSchema.medicalRecord.push(medicalRecord);
                await familyMemberSchema.save();
                familyMember.medicalRecord.push(medicalRecord);
                await patient.save();
            }
            else if (approvalRequest.recordTag === 'patient') {
                patient.medicalRecords.push(medicalRecord);
                await patient.save();
            }
            await this.patientDao.pullPatientApprovals(doctorAddress, principalPatientAddress);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Medical record created',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.DoctorError('An error occurred while creating medical record');
        }
    }
    async deleteAllApprovalRequests(walletAddress) {
        try {
            const doctor = await this.doctorDao.fetchDoctorByAddress(walletAddress);
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'doctor not found',
                };
            }
            doctor.activeApprovals = [];
            await doctor.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'All approval requests deleted',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.DoctorError('An error occurred while deleting all approval requests');
        }
    }
    async swapId(walletAddress, id) {
        try {
            const doctor = await this.doctorDao.fetchDoctorByAddress(walletAddress);
            doctor.id = id;
            await doctor.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'swapped id successfully',
            };
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.HttpException('an error occurred while swapping id', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [doctor_dao_1.DoctorDao,
        doctor_guard_1.DoctorGuard,
        hospital_dao_1.HospitalDao,
        patient_dao_1.PatientDao,
        patient_guard_1.PatientGuard,
        medicine_dao_1.MedicineDao,
        event_emitter_1.EventEmitter2])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map