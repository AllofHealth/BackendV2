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
var AdminController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../services/admin.service");
const admin_dto_1 = require("../dto/admin.dto");
const mongoose_1 = require("mongoose");
const admin_auth_guard_1 = require("../guards/admin.auth.guard");
const swagger_1 = require("@nestjs/swagger");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const admin_data_1 = require("../data/admin.data");
let AdminController = AdminController_1 = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
        this.logger = new my_logger_service_1.MyLoggerService(AdminController_1.name);
    }
    async getAllAdmins(ip) {
        this.logger.log(`Get all admin request ${ip}`);
        return await this.adminService.fetchAllAdmins();
    }
    async getAdminByAddress(ip, walletAddress) {
        this.logger.log(`Get admin by address request from ip ${ip}`);
        return await this.adminService.fetchAdminByAddress(walletAddress);
    }
    async getAllPractitioners(ip) {
        this.logger.log(`Get all practitioners request from ip ${ip}`);
        return await this.adminService.fetchAllPractitioners();
    }
    async createAdmin(ip, createAdminDto) {
        this.logger.log(`Create new admin request from address ${createAdminDto.walletAddress}, ip ${ip}`);
        return await this.adminService.createNewAdmin(createAdminDto);
    }
    async updateAdmin(ip, walletAddress, updateAdminDto) {
        this.logger.log(`Update admin request from address ${walletAddress}, ip ${ip}`);
        return await this.adminService.updateAdmin({
            walletAddress,
            data: updateAdminDto,
        });
    }
    async approveHospital(ip, adminAddress, hospitalId) {
        this.logger.log(`Request to approve hospital from wallet address ${adminAddress}, ip ${ip}`);
        return await this.adminService.approveHospital({ hospitalId });
    }
    async authenticateAdmin(ip, adminAddress, walletAddress, id) {
        this.logger.log(`Authenticate admin request from wallet address ${adminAddress}, ip address ${ip}`);
        return await this.adminService.authenticateAdmin({
            addressToAuthenticate: walletAddress,
            blockchainId: id,
        });
    }
    async deleteAdmin(ip, adminAddressToAuthorize, adminAddressToRemove) {
        this.logger.log(`Delete admin request from wallet ${adminAddressToAuthorize}, ip ${ip}`);
        return await this.adminService.removeAdmin({ adminAddressToRemove });
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('allAdmins'),
    (0, swagger_1.ApiOperation)({ summary: 'returns all admins' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: admin_dto_1.AdminDto,
        isArray: true,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: admin_data_1.AdminErrors.NOT_FOUND,
        status: common_1.HttpStatus.NOT_FOUND,
    }),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllAdmins", null);
__decorate([
    (0, common_1.Get)('getAdminByAddress'),
    (0, swagger_1.ApiOperation)({ summary: 'returns admin associated with a wallet address' }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        type: admin_dto_1.AdminDto,
        isArray: false,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: admin_data_1.AdminErrors.FETCHING_ADMIN,
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminByAddress", null);
__decorate([
    (0, common_1.Get)('getAllPractitioners'),
    (0, swagger_1.ApiOperation)({ summary: 'fetch all practitioners (doctors & pharmacist)' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        isArray: true,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: admin_data_1.AdminErrors.FETCHING_PRACTITIONERS,
    }),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllPractitioners", null);
__decorate([
    (0, common_1.Post)('createAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'creates a new admin document' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: admin_data_1.AdminMessages.CREATE_ADMIN,
        type: admin_dto_1.AdminDto,
        isArray: false,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: admin_data_1.AdminErrors.CREATE_ADMIN,
    }),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('updateAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'updates an admin document' }),
    (0, swagger_1.ApiQuery)({ description: 'admin ethereum address', name: 'walletAddress' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: admin_data_1.AdminMessages.ADMIN_UPDATED,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: admin_data_1.AdminErrors.ADMIN_UPDATE_ERROR,
    }),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Post)('approveHospital'),
    (0, swagger_1.ApiOperation)({ summary: 'approves an institution' }),
    (0, swagger_1.ApiQuery)({
        name: 'adminAddress',
        description: 'authenticated admin address',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'hospitalId',
        description: 'hospital mongo uuid',
        type: mongoose_1.Types.ObjectId.toString(),
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: admin_data_1.AdminMessages.HOSPITAL_APPROVED,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: admin_data_1.AdminErrors.HOSPITAL_APPROVE_ERROR,
    }),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('hospitalId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveHospital", null);
__decorate([
    (0, common_1.Post)('authenticateAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'authenticates an admin' }),
    (0, swagger_1.ApiQuery)({
        name: 'adminAddress',
        description: 'an authenticated admin address',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'walletAddress',
        description: 'an admin address to authenticate',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: admin_data_1.AdminMessages.AUTH_SUCCESSFUL,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: admin_data_1.AdminErrors.AUTH_ERROR,
    }),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('adminToAuthenticate', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('blockchainId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "authenticateAdmin", null);
__decorate([
    (0, common_1.Delete)('deleteAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'removes an admin document' }),
    (0, swagger_1.ApiQuery)({
        name: 'adminAddressToAuthorize',
        description: 'an authenticated ethereum address',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'adminAddressToRemove',
        description: 'an admin ethereum address',
    }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: admin_data_1.AdminMessages.ADMIN_REMOVED,
        isArray: false,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: admin_data_1.AdminErrors.ADMIN_REMOVED_ERROR,
    }),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('adminAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('adminAddressToRemove', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteAdmin", null);
exports.AdminController = AdminController = AdminController_1 = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map