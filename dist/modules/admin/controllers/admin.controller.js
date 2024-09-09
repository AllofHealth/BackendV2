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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../services/admin.service");
const admin_dto_1 = require("../dto/admin.dto");
const mongoose_1 = require("mongoose");
const admin_auth_guard_1 = require("../guards/admin.auth.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAllAdmins() {
        return await this.adminService.fetchAllAdmins();
    }
    async getAdminByAddress(walletAddress) {
        return await this.adminService.fetchAdminByAddress(walletAddress);
    }
    async getAllPractitioners() {
        return await this.adminService.fetchAllPractitioners();
    }
    async createAdmin(createAdminDto) {
        return await this.adminService.createNewAdmin(createAdminDto);
    }
    async updateAdmin(walletAddress, updateAdminDto) {
        return await this.adminService.updateAdmin({
            walletAddress,
            data: updateAdminDto,
        });
    }
    async approveHospital(adminAddress, hospitalId) {
        return await this.adminService.approveHospital({ hospitalId });
    }
    async authenticateAdmin(adminAddress, walletAddress, id) {
        return await this.adminService.authenticateAdmin({
            addressToAuthenticate: walletAddress,
            blockchainId: id,
        });
    }
    async modifyAddress(walletAddress, replaceAddress) {
        return await this.adminService.editAdmin({ walletAddress, replaceAddress });
    }
    async deleteAdmin(adminAddressToAuthorize, adminAddressToRemove) {
        return await this.adminService.removeAdmin({ adminAddressToRemove });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('allAdmins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllAdmins", null);
__decorate([
    (0, common_1.Get)('getAdminByAddress'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminByAddress", null);
__decorate([
    (0, common_1.Get)('getAllPractitioners'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllPractitioners", null);
__decorate([
    (0, common_1.Post)('createAdmin'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('updateAdmin'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Post)('approveHospital'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveHospital", null);
__decorate([
    (0, common_1.Post)('authenticateAdmin'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('adminToAuthenticate', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('blockchainId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "authenticateAdmin", null);
__decorate([
    (0, common_1.Post)('modifyAdminAddress'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Query)('adminAddress')),
    __param(1, (0, common_1.Query)('replaceAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "modifyAddress", null);
__decorate([
    (0, common_1.Delete)('deleteAdmin'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('adminAddressToRemove', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteAdmin", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map