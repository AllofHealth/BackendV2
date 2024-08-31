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
exports.DoctorVerificationGuard = exports.DoctorAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const doctor_dao_1 = require("../dao/doctor.dao");
const shared_1 = require("../../../shared");
let DoctorAuthGuard = class DoctorAuthGuard {
    constructor(doctorDao) {
        this.doctorDao = doctorDao;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const doctorAddress = request.query.doctorAddress;
        if (!doctorAddress) {
            throw new common_1.ForbiddenException('Please connect wallet');
        }
        const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
        if (!doctor) {
            throw new common_1.UnauthorizedException();
        }
        if (doctor.status !== shared_1.ApprovalStatus.Approved) {
            throw new common_1.UnauthorizedException('Doctor not approved by any institution');
        }
        return true;
    }
};
exports.DoctorAuthGuard = DoctorAuthGuard;
exports.DoctorAuthGuard = DoctorAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [doctor_dao_1.DoctorDao])
], DoctorAuthGuard);
class DoctorVerificationGuard {
    constructor(doctorDao) {
        this.doctorDao = doctorDao;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const doctorAddress = request.query.doctorAddress;
        const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
        if (!doctor.isVerified) {
            throw new common_1.ForbiddenException('please complete verification');
        }
        return true;
    }
}
exports.DoctorVerificationGuard = DoctorVerificationGuard;
//# sourceMappingURL=doctor.auth.guard.js.map