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
exports.DoctorGuard = void 0;
const common_1 = require("@nestjs/common");
const doctor_dao_1 = require("../dao/doctor.dao");
const shared_1 = require("../../../shared");
const hospital_dao_1 = require("../../hospital/dao/hospital.dao");
let DoctorGuard = class DoctorGuard {
    constructor(doctorDao, hospitalDao) {
        this.doctorDao = doctorDao;
        this.hospitalDao = hospitalDao;
    }
    async validateDoctorExistsInHospital(hospitalId, doctorAddress) {
        if (!hospitalId) {
            throw new shared_1.DoctorError('Invalid or missing doctor address');
        }
        let doctorExists = false;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(hospitalId);
            if (!hospital) {
                throw new shared_1.DoctorError('Hospital not found');
            }
            const doctor = hospital.doctors.find((doctor) => doctor.walletAddress === doctorAddress);
            if (doctor) {
                doctorExists = true;
            }
            return doctorExists;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.DoctorError('Error validating doctor exists in hospital');
        }
    }
    async validateDoctorExists(address) {
        let doctorExists = false;
        try {
            const doctor = await this.doctorDao.fetchDoctorByAddress(address);
            if (doctor) {
                doctorExists = true;
            }
            return doctorExists;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.DoctorError('Error validating doctor exists');
        }
    }
};
exports.DoctorGuard = DoctorGuard;
exports.DoctorGuard = DoctorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [doctor_dao_1.DoctorDao,
        hospital_dao_1.HospitalDao])
], DoctorGuard);
//# sourceMappingURL=doctor.guard.js.map