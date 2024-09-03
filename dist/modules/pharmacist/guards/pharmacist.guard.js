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
exports.PharmacistGuard = void 0;
const common_1 = require("@nestjs/common");
const hospital_dao_1 = require("../../hospital/dao/hospital.dao");
const shared_1 = require("../../../shared");
const pharmacist_dao_1 = require("../dao/pharmacist.dao");
let PharmacistGuard = class PharmacistGuard {
    constructor(hospitalDao, pharmacistDao) {
        this.hospitalDao = hospitalDao;
        this.pharmacistDao = pharmacistDao;
    }
    async validatePharmacistExistsInHospital(hospitalId, pharmacistAddress) {
        if (!Number(hospitalId) ||
            hospitalId <= 0 ||
            !pharmacistAddress ||
            pharmacistAddress.length < 42) {
            throw new shared_1.PharmacistError('Invalid or missing pharmacist address');
        }
        let pharmacistExists = false;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(hospitalId);
            if (!hospital) {
                throw new shared_1.PharmacistError('Hospital not found');
            }
            const pharmacist = hospital.pharmacists.find((pharmacist) => pharmacist.walletAddress === pharmacistAddress);
            if (pharmacist) {
                pharmacistExists = true;
            }
            return pharmacistExists;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error validating pharmacist exists in hospital');
        }
    }
    async validatePharmacistExists(address) {
        let pharmacistExists = false;
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(address);
            if (pharmacist) {
                pharmacistExists = true;
            }
            return pharmacistExists;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error validating pharmacist exists');
        }
    }
};
exports.PharmacistGuard = PharmacistGuard;
exports.PharmacistGuard = PharmacistGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hospital_dao_1.HospitalDao,
        pharmacist_dao_1.PharmacistDao])
], PharmacistGuard);
//# sourceMappingURL=pharmacist.guard.js.map