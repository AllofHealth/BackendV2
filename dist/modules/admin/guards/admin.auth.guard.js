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
exports.AdminAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../services/admin.service");
let AdminAuthGuard = class AdminAuthGuard {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const adminAddress = request.query.adminAddress;
        if (!adminAddress) {
            throw new common_1.ForbiddenException('please connect wallet');
        }
        if (!(await this.adminService.isAdminAuthenticated(adminAddress))) {
            throw new common_1.ForbiddenException('Not an authenticated admin');
        }
        return true;
    }
};
exports.AdminAuthGuard = AdminAuthGuard;
exports.AdminAuthGuard = AdminAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminAuthGuard);
//# sourceMappingURL=admin.auth.guard.js.map