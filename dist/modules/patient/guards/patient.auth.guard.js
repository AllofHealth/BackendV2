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
exports.PatientVerificationGuard = exports.PatientAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const patient_dao_1 = require("../dao/patient.dao");
let PatientAuthGuard = class PatientAuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const patientAddress = request.query.walletAddress;
        if (!patientAddress) {
            throw new common_1.UnauthorizedException('Please connect your wallet');
        }
        return true;
    }
};
exports.PatientAuthGuard = PatientAuthGuard;
exports.PatientAuthGuard = PatientAuthGuard = __decorate([
    (0, common_1.Injectable)()
], PatientAuthGuard);
let PatientVerificationGuard = class PatientVerificationGuard {
    constructor(patientDao) {
        this.patientDao = patientDao;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const patientAddress = request.query.walletAddress;
        const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
        if (!patient && !patient.isVerified) {
            throw new common_1.ForbiddenException('please complete verification');
        }
        return true;
    }
};
exports.PatientVerificationGuard = PatientVerificationGuard;
exports.PatientVerificationGuard = PatientVerificationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patient_dao_1.PatientDao])
], PatientVerificationGuard);
//# sourceMappingURL=patient.auth.guard.js.map