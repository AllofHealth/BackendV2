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
exports.HospitalGuard = void 0;
const common_1 = require("@nestjs/common");
const hospital_dao_1 = require("../dao/hospital.dao");
const shared_1 = require("../../shared");
let HospitalGuard = class HospitalGuard {
    constructor(hospitalDao) {
        this.hospitalDao = hospitalDao;
    }
    async validateHospitalAdmin(hospital, adminAddress) {
        if (!hospital || !adminAddress || adminAddress.length !== 42) {
            throw new shared_1.HospitalError('Error validating parameters');
        }
        let isAdmin = false;
        try {
            if (hospital.admin === adminAddress) {
                isAdmin = true;
            }
            return isAdmin;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error validating admin');
        }
    }
    async validateHospitalExists(hospitalId) {
        if (!hospitalId) {
            throw new shared_1.HospitalError('Invalid or missing hospital id');
        }
        try {
            let hospitalExist = false;
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            if (hospital) {
                hospitalExist = true;
            }
            return hospitalExist;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.HospitalError('Error validating hospital');
        }
    }
};
exports.HospitalGuard = HospitalGuard;
exports.HospitalGuard = HospitalGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hospital_dao_1.HospitalDao])
], HospitalGuard);
//# sourceMappingURL=hospital.guard.js.map