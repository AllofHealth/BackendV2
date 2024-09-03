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
exports.HospitalApprovedGuard = void 0;
const common_1 = require("@nestjs/common");
const hospital_dao_1 = require("../dao/hospital.dao");
const shared_1 = require("../../../shared");
let HospitalApprovedGuard = class HospitalApprovedGuard {
    constructor(hospitalDao) {
        this.hospitalDao = hospitalDao;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const hospitalId = request.query.hospitalId;
        if (!hospitalId) {
            throw new common_1.ForbiddenException('Invalid institution id');
        }
        const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
        if (!hospital) {
            throw new common_1.ForbiddenException('Invalid institution id');
        }
        if (hospital.status !== shared_1.ApprovalStatus.Approved) {
            throw new common_1.ForbiddenException('Institution not approved');
        }
        return true;
    }
};
exports.HospitalApprovedGuard = HospitalApprovedGuard;
exports.HospitalApprovedGuard = HospitalApprovedGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hospital_dao_1.HospitalDao])
], HospitalApprovedGuard);
//# sourceMappingURL=hospital.approved.guard.js.map