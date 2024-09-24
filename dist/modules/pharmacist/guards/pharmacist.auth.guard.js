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
exports.PharmacistExist = exports.PharmacistVerificationGuard = exports.PharmacistAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const pharmacist_dao_1 = require("../dao/pharmacist.dao");
const shared_1 = require("../../../shared");
let PharmacistAuthGuard = class PharmacistAuthGuard {
    constructor(pharmacistDao) {
        this.pharmacistDao = pharmacistDao;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const pharmacistAddress = request.query.walletAddress;
        if (!pharmacistAddress) {
            throw new common_1.ForbiddenException('Invalid request');
        }
        const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
        if (!pharmacist && pharmacist.status !== shared_1.ApprovalStatus.Approved) {
            throw new common_1.UnauthorizedException('Pharmacist not found or not approved');
        }
        return true;
    }
};
exports.PharmacistAuthGuard = PharmacistAuthGuard;
exports.PharmacistAuthGuard = PharmacistAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pharmacist_dao_1.PharmacistDao])
], PharmacistAuthGuard);
let PharmacistVerificationGuard = class PharmacistVerificationGuard {
    constructor(pharmacistDao) {
        this.pharmacistDao = pharmacistDao;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const walletAddress = request.query.walletAddress;
        const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
        if (!pharmacist.isVerified) {
            throw new common_1.ForbiddenException('please complete verification');
        }
        return true;
    }
};
exports.PharmacistVerificationGuard = PharmacistVerificationGuard;
exports.PharmacistVerificationGuard = PharmacistVerificationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pharmacist_dao_1.PharmacistDao])
], PharmacistVerificationGuard);
let PharmacistExist = class PharmacistExist {
    constructor(pharmacistDao) {
        this.pharmacistDao = pharmacistDao;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const pharmacistAddress = request.query.walletAddress;
        if (!pharmacistAddress) {
            throw new common_1.ForbiddenException('Invalid request');
        }
        const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
        if (!pharmacist)
            throw new common_1.UnauthorizedException('no associated pharmacist');
        return true;
    }
};
exports.PharmacistExist = PharmacistExist;
exports.PharmacistExist = PharmacistExist = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pharmacist_dao_1.PharmacistDao])
], PharmacistExist);
//# sourceMappingURL=pharmacist.auth.guard.js.map