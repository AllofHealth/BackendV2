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
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const admin_dao_1 = require("../dao/admin.dao");
const shared_1 = require("../../../shared");
let AdminGuard = class AdminGuard {
    constructor(adminDao) {
        this.adminDao = adminDao;
    }
    async validateAdmin(address) {
        let adminExists = false;
        try {
            const admin = await this.adminDao.validateAdminExists(address);
            if (admin) {
                adminExists = true;
            }
            return adminExists;
        }
        catch (error) {
            console.error(error);
            throw new shared_1.AdminError('Error validating admin exists');
        }
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_dao_1.AdminDao])
], AdminGuard);
//# sourceMappingURL=admin.guard.js.map