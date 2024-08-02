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
exports.HospitalService = void 0;
const common_1 = require("@nestjs/common");
const hospital_schema_1 = require("../schema/hospital.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hospital_guard_1 = require("../guard/hospital.guard");
const shared_1 = require("../../../shared");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const hospital_dao_1 = require("../dao/hospital.dao");
const doctor_dao_1 = require("../../doctor/dao/doctor.dao");
const pharmacist_dao_1 = require("../../pharmacist/dao/pharmacist.dao");
const doctor_guard_1 = require("../../doctor/guards/doctor.guard");
const pharmacist_guard_1 = require("../../pharmacist/guards/pharmacist.guard");
let HospitalService = class HospitalService {
    constructor(hospitalModel, hospitalDao, hospitalGuard, doctorDao, pharmacistDao, doctorGuard, pharmacistGuard) {
        this.hospitalModel = hospitalModel;
        this.hospitalDao = hospitalDao;
        this.hospitalGuard = hospitalGuard;
        this.doctorDao = doctorDao;
        this.pharmacistDao = pharmacistDao;
        this.doctorGuard = doctorGuard;
        this.pharmacistGuard = pharmacistGuard;
        this.logger = new my_logger_service_1.MyLoggerService('HospitalService');
    }
    async createNewHospital(args) {
        try {
            const hospitalExist = await this.hospitalDao.fetchHospitalWithBlockchainId(args.id);
            if (hospitalExist) {
                return {
                    success: common_1.HttpStatus.CREATED,
                    message: 'hospital already exists',
                };
            }
            const hospital = await this.hospitalDao.createHospital(args);
            return {
                success: shared_1.ErrorCodes.Success,
                hospital,
                message: 'Hospital created successfully',
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_2.MongooseError)
                throw new shared_1.HospitalError(error.message);
            throw new common_1.InternalServerErrorException('Error creating hospital');
        }
    }
    async removeDoctorFromHospital(hospitalId, doctorAddress) {
        try {
            await this.hospitalDao.pullOneDoctor(hospitalId, doctorAddress);
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error removing doctor');
        }
    }
    async removeHospitalIdFromDoctorDocument(args) {
        const { hospitalId, doctorAddress } = args;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'hospital not found',
                };
            }
            if (!doctor) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'doctor not found',
                };
            }
            doctor.hospitalIds.splice(doctor.hospitalIds.indexOf(hospital.id), 1);
            if (doctor.hospitalIds.length === 0) {
                doctor.status = shared_1.ApprovalStatus.Pending;
                doctor.hospitalIds = [];
            }
            await doctor.save();
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error removing hospital id from doctor document');
        }
    }
    async removeHospitalIdFromPharmacistDocument(args) {
        const { hospitalId, pharmacistAddress } = args;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'hospital not found',
                };
            }
            if (!pharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'pharmacist not found',
                };
            }
            pharmacist.hospitalIds.splice(pharmacist.hospitalIds.indexOf(hospital.id), 1);
            if (pharmacist.hospitalIds.length === 0) {
                pharmacist.status = shared_1.ApprovalStatus.Pending;
                pharmacist.hospitalIds = [];
            }
            await pharmacist.save();
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error removing hospital id from pharmacist document');
        }
    }
    async removeHospitalIdFromPractitionerDocument(args) {
        const { hospitalId, practitionerAddress } = args;
        try {
            const isDoctor = await this.doctorGuard.validateDoctorExists(practitionerAddress);
            const isPharmacist = await this.pharmacistGuard.validatePharmacistExists(practitionerAddress);
            if (isDoctor) {
                await this.removeHospitalIdFromDoctorDocument({
                    hospitalId,
                    doctorAddress: practitionerAddress,
                });
            }
            else if (isPharmacist) {
                await this.removeHospitalIdFromPharmacistDocument({
                    hospitalId,
                    pharmacistAddress: practitionerAddress,
                });
            }
            else {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'practitioner not found',
                };
            }
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error removing practitioner address for hospital');
        }
    }
    async removePharmacistFromHospital(hospitalId, pharmacistAddress) {
        try {
            return await this.hospitalDao.pullOnePharmacist(hospitalId, pharmacistAddress);
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error removing pharmacist');
        }
    }
    async delegateAdminPosition(newAdminAddress, adminAddress, hospitalId) {
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            if (!hospital) {
                throw new shared_1.HospitalError("Hospital doesn't exist");
            }
            if (!(await this.hospitalGuard.validateHospitalAdmin(hospital, adminAddress))) {
                throw new shared_1.HospitalError('not authorized');
            }
            const isAffiliated = (await this.returnDoctorFromHospital(hospital, newAdminAddress)) ||
                (await this.returnPharmacistFromHospital(hospital, newAdminAddress));
            if (!isAffiliated ||
                isAffiliated == undefined ||
                isAffiliated.status !== shared_1.ApprovalStatus.Approved) {
                throw new Error('User is not affiliated with hospital or not yet approved');
            }
            hospital.admin = newAdminAddress;
            await hospital.save();
            return {
                success: shared_1.ErrorCodes.Success,
                message: 'Successfully delegated admin position',
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error delegating admin position');
        }
    }
    async updateHospitalProfile(hospitalId, adminAddress, updateData) {
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'hospital not found',
                };
            }
            if (hospital.admin !== adminAddress) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'not authorized',
                };
            }
            const updatedHospital = await this.hospitalDao.updateHospital(hospitalId, updateData);
            await hospital.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'hospital successfully updated',
                updatedHospital,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_2.MongooseError)
                throw new mongoose_2.MongooseError(error.message);
            throw new shared_1.HospitalError('Error updating hospital profile');
        }
    }
    async joinHospital(args) {
        const { hospitalId, walletAddress } = args;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'hospital not found',
                };
            }
            const isDoctor = await this.doctorGuard.validateDoctorExists(walletAddress);
            const isPharmacist = await this.pharmacistGuard.validatePharmacistExists(walletAddress);
            if (!isDoctor && !isPharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'practitioner not found',
                };
            }
            if (isDoctor) {
                const doctorExist = await this.doctorGuard.validateDoctorExistsInHospital(hospital.id, walletAddress);
                if (doctorExist) {
                    return {
                        success: common_1.HttpStatus.CREATED,
                        message: 'doctor already exists in hospital',
                    };
                }
                const doctor = await this.doctorDao.fetchDoctorByAddress(walletAddress);
                const doctorPreview = {
                    walletAddress,
                    profilePicture: doctor.profilePicture,
                    name: doctor.name,
                    status: doctor.status,
                    category: doctor.category,
                };
                doctor.hospitalIds.push(hospital.id);
                await doctor.save();
                try {
                    hospital.doctors.push(doctorPreview);
                }
                catch (error) {
                    await this.removeHospitalIdFromDoctorDocument({
                        hospitalId,
                        doctorAddress: walletAddress,
                    });
                    return {
                        success: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'an error occurred while adding doctor to  hospital',
                    };
                }
            }
            else if (isPharmacist) {
                const pharmacistExist = await this.pharmacistGuard.validatePharmacistExistsInHospital(hospital.id, walletAddress);
                if (pharmacistExist) {
                    return {
                        success: common_1.HttpStatus.CREATED,
                        message: 'pharmacist already exists in hospital',
                    };
                }
                const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
                const pharmacistPreview = {
                    walletAddress,
                    profilePicture: pharmacist.profilePicture,
                    name: pharmacist.name,
                    status: pharmacist.status,
                    category: pharmacist.category,
                };
                pharmacist.hospitalIds.push(hospital.id);
                await pharmacist.save();
                try {
                    hospital.pharmacists.push(pharmacistPreview);
                }
                catch (error) {
                    await this.removeHospitalIdFromPharmacistDocument({
                        hospitalId,
                        pharmacistAddress: walletAddress,
                    });
                    return {
                        success: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'an error occurred while adding pharmacist to  hospital',
                    };
                }
            }
            await hospital.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'joined hospital successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('An error occurred while joining hospital');
        }
    }
    async removePractitionerFromHospital(adminAddress, args) {
        const { hospitalId, walletAddress } = args;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            const isDoctor = await this.doctorGuard.validateDoctorExistsInHospital(hospital.id, walletAddress);
            const isPharmacist = await this.pharmacistGuard.validatePharmacistExistsInHospital(hospital.id, walletAddress);
            if (adminAddress !== hospital.admin) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'unauthorized, not the admin',
                };
            }
            if (!isDoctor && !isPharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'practitioner not found',
                };
            }
            try {
                await this.removeHospitalIdFromPractitionerDocument({
                    hospitalId,
                    practitionerAddress: walletAddress,
                });
                if (isDoctor) {
                    await this.removeDoctorFromHospital(hospitalId, walletAddress);
                    await hospital.save();
                }
                else if (isPharmacist) {
                    await this.removePharmacistFromHospital(hospitalId, walletAddress);
                    await hospital.save();
                }
            }
            catch (error) {
                return {
                    success: common_1.HttpStatus.EXPECTATION_FAILED,
                    message: 'an error occurred while removing practitioner from hospital',
                };
            }
            await hospital.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'practitioner removed from hospital successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('An error occurred while removing practitioner');
        }
    }
    async approvePractitioner(hospitalAdmin, args) {
        const { hospitalId, walletAddress } = args;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            const isDoctor = await this.doctorGuard.validateDoctorExistsInHospital(hospital.id, walletAddress);
            if (hospital.admin !== hospitalAdmin) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'unauthorized, contact hospital admin',
                };
            }
            const isPharmacist = await this.pharmacistGuard.validatePharmacistExistsInHospital(hospital.id, walletAddress);
            if (!isDoctor && !isPharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'practitioner not found',
                };
            }
            const practitioner = isDoctor
                ? await this.doctorDao.fetchDoctorByAddress(walletAddress)
                : await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (practitioner.status !== shared_1.ApprovalStatus.Approved) {
                practitioner.status = shared_1.ApprovalStatus.Approved;
                await practitioner.save();
            }
            const practitionerList = isDoctor
                ? hospital.doctors
                : hospital.pharmacists;
            const practitionerPreview = practitionerList.find((p) => p.walletAddress === walletAddress);
            if (practitionerPreview.status === shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.ACCEPTED,
                    message: 'practitioner already approved',
                };
            }
            practitionerPreview.status = shared_1.ApprovalStatus.Approved;
            await hospital.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'practitioner approved successfully',
            };
        }
        catch (error) {
            console.error(error);
        }
    }
    async fetchApprovedHospitals() {
        try {
            const hospitals = await this.hospitalDao.fetchHospitalWithApprovedStatus();
            if (!hospitals) {
                console.log('No approved hospitals');
                throw new shared_1.HospitalError('No approved hospitals found');
            }
            if (hospitals.length === 0) {
                return {
                    success: 404,
                    hospitals: [],
                };
            }
            return {
                success: 200,
                hospitals,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error fetching approved hospitals');
        }
    }
    async fetchPendingHospitals() {
        try {
            const hospitals = await this.hospitalDao.fetchHospitalWithPendingStatus();
            if (!hospitals) {
                console.log('No approved hospitals');
                throw new shared_1.HospitalError('No approved hospitals found');
            }
            if (hospitals.length === 0) {
                return {
                    success: 404,
                    hospitals: [],
                };
            }
            return {
                success: 200,
                hospitals,
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new shared_1.HospitalError('Error fetching approved hospitals');
        }
    }
    async fetchAllHospitals() {
        try {
            const hospitals = await this.hospitalModel.find();
            if (!hospitals) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    hospitals: [],
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                hospitals,
            };
        }
        catch (error) {
            this.logger.info('Error fetching all hospitals');
            throw new shared_1.HospitalError('Error fetching all hospitals');
        }
    }
    async fetchHospitalById(id) {
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(id);
            if (!hospital) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    message: 'Hospital not found',
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                hospital: hospital,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_2.MongooseError)
                throw new mongoose_2.MongooseError(error.message);
            throw new common_1.InternalServerErrorException('Error fetching hospital');
        }
    }
    async fetchPendingDoctors(hospitalId) {
        if (!hospitalId) {
            throw new shared_1.HospitalError('Invalid or missing hospital id');
        }
        try {
            const { hospital } = await this.fetchHospitalById(hospitalId);
            if (!hospital) {
                throw new shared_1.HospitalError("hospital doesn't exist");
            }
            const doctors = hospital.doctors.filter((doctor) => {
                return doctor.status === shared_1.ApprovalStatus.Pending;
            });
            if (doctors.length === 0) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    doctors: [],
                    message: 'No pending doctors found',
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                doctors,
                message: 'pending doctors found',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error fetching pending doctors');
        }
    }
    async fetchPendingPharmacists(hospitalId) {
        if (!hospitalId) {
            throw new shared_1.HospitalError('Invalid or missing hospital id');
        }
        try {
            const { hospital } = await this.fetchHospitalById(hospitalId);
            if (!hospital) {
                throw new shared_1.HospitalError("hospital doesn't exist");
            }
            const pharmacists = hospital.pharmacists.filter((pharmacist) => {
                return pharmacist.status === shared_1.ApprovalStatus.Pending;
            });
            if (pharmacists.length === 0) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    pharmacists: [],
                    message: 'No pending pharmacists found',
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                pharmacists,
                message: 'pending pharmacists found',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error fetching pharmacists');
        }
    }
    async fetchApprovedDoctors(hospitalId) {
        if (!hospitalId) {
            throw new shared_1.HospitalError('Invalid or missing hospital id');
        }
        try {
            const { hospital } = await this.fetchHospitalById(hospitalId);
            if (!hospital) {
                throw new shared_1.HospitalError("hospital doesn't exists");
            }
            const doctors = hospital.doctors.filter((doctor) => {
                return doctor.status === shared_1.ApprovalStatus.Approved;
            });
            if (doctors.length === 0) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    doctors: [],
                    message: 'No approved doctors found',
                };
            }
            console.log(doctors);
            return {
                success: shared_1.ErrorCodes.Success,
                doctors,
                message: 'Approved doctors fetched successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error fetching approved doctors');
        }
    }
    async fetchApprovedPharmacists(hospitalId) {
        if (!hospitalId) {
            throw new shared_1.HospitalError('Invalid or missing hospital id');
        }
        try {
            const { hospital } = await this.fetchHospitalById(hospitalId);
            if (!hospital) {
                throw new shared_1.HospitalError("hospital doesn't exists");
            }
            const pharmacists = hospital.pharmacists.filter((pharmacist) => {
                return pharmacist.status === shared_1.ApprovalStatus.Approved;
            });
            if (pharmacists.length === 0) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    pharmacists: [],
                    message: 'No approved pharmacists found',
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                pharmacists,
                message: 'Approved pharmacists fetched successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error fetching pharmacists');
        }
    }
    async fetchAllDoctors(hospitalId) {
        if (!hospitalId) {
            throw new shared_1.HospitalError('Invalid or missing hospital id');
        }
        try {
            const { hospital } = await this.fetchHospitalById(hospitalId);
            if (!hospital) {
                throw new shared_1.HospitalError("hospital doesn't exist");
            }
            const doctors = hospital.doctors;
            if (!doctors) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    doctors: [],
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                doctors,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error fetching approved doctors');
        }
    }
    async fetchAllPharmacists(hospitalId) {
        if (!hospitalId) {
            throw new shared_1.HospitalError('Invalid or missing hospital id');
        }
        try {
            const { hospital } = await this.fetchHospitalById(hospitalId);
            if (!hospital) {
                throw new shared_1.HospitalError("hospital doesn't exist");
            }
            const pharmacists = hospital.pharmacists;
            if (!pharmacists) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    pharmacists: [],
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                pharmacists,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error fetching pharmacists');
        }
    }
    async fetchHospitalPractitioners(hospitalId) {
        try {
            const { doctors } = await this.fetchAllDoctors(hospitalId);
            const { pharmacists } = await this.fetchAllPharmacists(hospitalId);
            const allPractitioners = doctors.concat(pharmacists);
            if (!allPractitioners) {
                return {
                    success: common_1.HttpStatus.FOUND,
                    practitioners: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                practitioners: allPractitioners,
            };
        }
        catch (error) {
            console.error(error);
        }
    }
    async returnDoctorFromHospital(hospital, walletAddress) {
        try {
            const Doctor = hospital.doctors.find((d) => {
                return d.walletAddress === walletAddress;
            });
            if (!Doctor) {
                console.info('Doctor not found');
            }
            return Doctor;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error finding doctor');
        }
    }
    async returnPharmacistFromHospital(hospital, walletAddress) {
        try {
            const pharmacists = hospital.pharmacists.find((d) => {
                return d.walletAddress === walletAddress;
            });
            if (!pharmacists) {
                console.info('pharmacist not found');
            }
            return pharmacists;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('pharmacists not found');
        }
    }
    async validatePractitioner(walletAddress) {
        let isPractitioner = false;
        if ((await this.doctorGuard.validateDoctorExists(walletAddress)) ||
            (await this.pharmacistGuard.validatePharmacistExists(walletAddress))) {
            isPractitioner = true;
        }
        return isPractitioner;
    }
    async fetchPractitionerCreatedHospital(walletAddress) {
        try {
            const isPractitioner = await this.validatePractitioner(walletAddress);
            if (!isPractitioner) {
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'User is not a doctor or pharmacist',
                };
            }
            const hospitals = await this.hospitalDao.findManyHospital(walletAddress);
            if (!hospitals) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'No hospitals found',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                hospitals,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('An error occurred while fetching hospitals');
        }
    }
};
exports.HospitalService = HospitalService;
exports.HospitalService = HospitalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hospital_schema_1.Hospital.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        hospital_dao_1.HospitalDao,
        hospital_guard_1.HospitalGuard,
        doctor_dao_1.DoctorDao,
        pharmacist_dao_1.PharmacistDao,
        doctor_guard_1.DoctorGuard,
        pharmacist_guard_1.PharmacistGuard])
], HospitalService);
//# sourceMappingURL=hospital.service.js.map