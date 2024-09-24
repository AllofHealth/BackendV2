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
var PharmacistController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacistController = void 0;
const common_1 = require("@nestjs/common");
const pharmacist_service_1 = require("../services/pharmacist.service");
const pharmacist_dto_1 = require("../dto/pharmacist.dto");
const mongoose_1 = require("mongoose");
const pharmacist_auth_guard_1 = require("../guards/pharmacist.auth.guard");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const swagger_1 = require("@nestjs/swagger");
let PharmacistController = PharmacistController_1 = class PharmacistController {
    constructor(pharmacistService) {
        this.pharmacistService = pharmacistService;
        this.logger = new my_logger_service_1.MyLoggerService(PharmacistController_1.name);
    }
    async createPharmacist(ip, createPharmacistDto) {
        this.logger.log(`Create Pharmacist Request\t${ip}`);
        return await this.pharmacistService.createPharmacist(createPharmacistDto);
    }
    async updatePharmacist(ip, walletAddress, updatePharmacistDto) {
        this.logger.log(`Update Pharmacist Request\t${ip}`);
        return await this.pharmacistService.updatePharmacist(walletAddress, updatePharmacistDto);
    }
    async addMedicine(ip, walletAddress, medicine) {
        this.logger.log(`Add Medicine Request\t${ip}`);
        return await this.pharmacistService.addMedicine(walletAddress, medicine.category, medicine);
    }
    async removeMedicine(ip, walletAddress, productId, medicineId) {
        this.logger.log(`Remove Medicine Request\t${ip}`);
        return await this.pharmacistService.deleteMedicine({
            walletAddress,
            productId,
            medicineId,
        });
    }
    async updateMedicine(ip, walletAddress, medicineId, productId, data) {
        this.logger.log(`Update Medicine Request\t${ip}`);
        return await this.pharmacistService.updateMedicine({
            walletAddress,
            productId,
            medicineId,
        }, data);
    }
    async dispensePrescription(ip, patientAddress, pharmacistAddress, dispenseDto) {
        this.logger.log(`Dispense Prescription Request\t${ip}`);
        return await this.pharmacistService.dispensePrescription({
            patientAddress,
            pharmacistAddress,
            productToDispense: dispenseDto.productToDispense,
            directions: dispenseDto.directions,
            quantity: dispenseDto.quantity,
            medicineId: new mongoose_1.Types.ObjectId(dispenseDto.medicineId),
        });
    }
    async removePrescription(ip, walletAddress, prescriptionId) {
        this.logger.log(`Remove Prescription Request\t${ip}`);
        return await this.pharmacistService.removePrescription({
            walletAddress,
            prescriptionId,
        });
    }
    async getPharmacist(ip, walletAddress) {
        this.logger.log(`Get Pharmacist Request\t${ip}`);
        return await this.pharmacistService.getPharmacistByAddress(walletAddress);
    }
    async getApprovedPharmacists(ip) {
        this.logger.log(`Get Approved Pharmacist Request\t${ip}`);
        return await this.pharmacistService.getApprovedPharmacists();
    }
    async getPendingPharmacists(ip) {
        this.logger.log(`Get Pending Pharmacist Request\t${ip}`);
        return await this.pharmacistService.getPendingPharmacists();
    }
    async getAllPharmacists(ip) {
        this.logger.log(`Create New Patient Request\t${ip}`);
        return await this.pharmacistService.getAllPharmacists();
    }
    async deletePharmacistByAddress(ip, walletAddress) {
        this.logger.log(`Delete Pharmacist Request\t${ip}`);
        return await this.pharmacistService.deletePharmacist(walletAddress);
    }
    async getMedicine(ip, walletAddress, productId, medicineId) {
        this.logger.log(`Get Medicine Request\t${ip}`);
        return await this.pharmacistService.fetchMedicine({
            walletAddress,
            productId,
            medicineId,
        });
    }
    async fetchProduct(ip, walletAddress, productId) {
        this.logger.log(`Fetch Product Request\t${ip}`);
        return await this.pharmacistService.fetchProduct({
            walletAddress,
            productId,
        });
    }
    async getAllProducts(ip, walletAddress) {
        this.logger.log(`Get All Products Request\t${ip}`);
        return await this.pharmacistService.fetchAllProducts(walletAddress);
    }
    async getInventory(ip, walletAddress) {
        this.logger.log(`Get Inventory Request\t${ip}`);
        return await this.pharmacistService.fetchInventory(walletAddress);
    }
    async getAllSharedPrescriptions(ip, walletAddress) {
        this.logger.log(`Get All Shared Prescription Request\t${ip}`);
        return await this.pharmacistService.fetchAllSharedPrescriptions(walletAddress);
    }
    async getSharedPrescription(ip, walletAddress, prescriptionId) {
        this.logger.log(`Get Shared Prescription Request\t${ip}`);
        return await this.pharmacistService.fetchPrescriptionById({
            walletAddress,
            prescriptionId,
        });
    }
    async checkProductExist(ip, walletAddress, category, productPrescribed) {
        this.logger.log(`Create Product Availabilty Request\t${ip}`);
        return await this.pharmacistService.checkMedicineExist({
            walletAddress,
            category,
            productPrescribed,
        });
    }
};
exports.PharmacistController = PharmacistController;
__decorate([
    (0, common_1.Post)('createPharmacist'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pharmacist_dto_1.CreatePharmacistDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "createPharmacist", null);
__decorate([
    (0, common_1.Post)('updatePharmacist'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, pharmacist_dto_1.UpdatePharmacistDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "updatePharmacist", null);
__decorate([
    (0, common_1.Post)('addMedicine'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, pharmacist_dto_1.AddMedicineDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "addMedicine", null);
__decorate([
    (0, common_1.Post)('removeMedicine'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('productId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('medicineId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "removeMedicine", null);
__decorate([
    (0, common_1.Post)('updateMedicine'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('medicineId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('productId', new common_1.ValidationPipe({ transform: true }))),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId, pharmacist_dto_1.UpdateMedicineDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "updateMedicine", null);
__decorate([
    (0, common_1.Post)('dispensePrescription'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('patientAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('pharmacistAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, pharmacist_dto_1.DispenseMedicationDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "dispensePrescription", null);
__decorate([
    (0, common_1.Post)('removePrescription'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('prescriptionId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "removePrescription", null);
__decorate([
    (0, common_1.Get)('getPharmacist'),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getPharmacist", null);
__decorate([
    (0, common_1.Get)('approvedPharmacists'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getApprovedPharmacists", null);
__decorate([
    (0, common_1.Get)('pendingPharmacists'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getPendingPharmacists", null);
__decorate([
    (0, common_1.Get)('getAllPharmacists'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getAllPharmacists", null);
__decorate([
    (0, common_1.Delete)('deletePharmacist'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistExist),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "deletePharmacistByAddress", null);
__decorate([
    (0, common_1.Get)('getMedicine'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('productId', new common_1.ValidationPipe({ transform: true }))),
    __param(3, (0, common_1.Query)('medicineId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getMedicine", null);
__decorate([
    (0, common_1.Get)('getProduct'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress')),
    __param(2, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "fetchProduct", null);
__decorate([
    (0, common_1.Get)('getAllProducts'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('getInventory'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Get)('getAllSharedPrescriptions'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getAllSharedPrescriptions", null);
__decorate([
    (0, common_1.Get)('getSharedPrescription'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Query)('prescriptionId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getSharedPrescription", null);
__decorate([
    (0, common_1.Get)('checkProductAvailability'),
    (0, common_1.UseGuards)(pharmacist_auth_guard_1.PharmacistAuthGuard, pharmacist_auth_guard_1.PharmacistVerificationGuard),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, common_1.Query)('walletAddress')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('medication')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "checkProductExist", null);
exports.PharmacistController = PharmacistController = PharmacistController_1 = __decorate([
    (0, swagger_1.ApiTags)('pharmacist'),
    (0, common_1.Controller)('pharmacist'),
    __metadata("design:paramtypes", [pharmacist_service_1.PharmacistService])
], PharmacistController);
//# sourceMappingURL=pharmacist.controller.js.map