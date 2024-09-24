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
exports.PatientGuard = void 0;
const common_1 = require("@nestjs/common");
const patient_dao_1 = require("../dao/patient.dao");
let PatientGuard = class PatientGuard {
    constructor(patientDao) {
        this.patientDao = patientDao;
    }
    async validatePatient(walletAddress) {
        let patientExist = false;
        try {
            const patient = await this.patientDao.fetchPatientByAddress(walletAddress);
            if (patient) {
                patientExist = true;
            }
            return patientExist;
        }
        catch (error) {
            console.error(error);
            throw new Error('An error occurred while validating patient');
        }
    }
};
exports.PatientGuard = PatientGuard;
exports.PatientGuard = PatientGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_dao_1.PatientDao])
], PatientGuard);
//# sourceMappingURL=patient.guard.js.map