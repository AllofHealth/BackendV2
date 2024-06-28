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
exports.PharmacistController = void 0;
const common_1 = require("@nestjs/common");
const pharmacist_service_1 = require("../services/pharmacist.service");
const pharmacist_dto_1 = require("../dto/pharmacist.dto");
const mongoose_1 = require("mongoose");
let PharmacistController = class PharmacistController {
    constructor(pharmacistService) {
        this.pharmacistService = pharmacistService;
    }
    async createPharmacist(createPharmacistDto) {
        return await this.pharmacistService.createPharmacist(createPharmacistDto);
    }
    async updatePharmacist(walletAddress, updatePharmacistDto) {
        return await this.pharmacistService.updatePharmacist(walletAddress, updatePharmacistDto);
    }
    async addMedicine(walletAddress, medicine) {
        return await this.pharmacistService.addMedicine(walletAddress, medicine);
    }
    async removeMedicine(walletAddress, medicineId) {
        return await this.pharmacistService.deleteMedicine(walletAddress, medicineId);
    }
    async updateMedicine(walletAddress, medicineId, medicine) {
        return await this.pharmacistService.updateMedicine(walletAddress, medicineId, medicine);
    }
    async getPharmacist(walletAddress) {
        return await this.pharmacistService.getPharmacistByAddress(walletAddress);
    }
    async getApprovedPharmacists() {
        return await this.pharmacistService.getApprovedPharmacists();
    }
    async getPendingPharmacists() {
        return await this.pharmacistService.getPendingPharmacists();
    }
    async getAllPharmacists() {
        return await this.pharmacistService.getAllPharmacists();
    }
    async deletePharmacistByAddress(walletAddress) {
        return await this.pharmacistService.deletePharmacist(walletAddress);
    }
    async getMedicine(walletAddress, medicineId) {
        return await this.pharmacistService.fetchMedicine(walletAddress, medicineId);
    }
    async getAllMedicines(walletAddress) {
        return await this.pharmacistService.fetchAllMedicine(walletAddress);
    }
    async getInventory(walletAddress) {
        return await this.pharmacistService.fetchInventory(walletAddress);
    }
};
exports.PharmacistController = PharmacistController;
__decorate([
    (0, common_1.Post)('createPharmacist'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pharmacist_dto_1.CreatePharmacistDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "createPharmacist", null);
__decorate([
    (0, common_1.Post)('updatePharmacist'),
    __param(0, (0, common_1.Query)('walletAddress')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pharmacist_dto_1.UpdatePharmacistDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "updatePharmacist", null);
__decorate([
    (0, common_1.Post)('addMedicine'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pharmacist_dto_1.AddMedicineDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "addMedicine", null);
__decorate([
    (0, common_1.Post)('removeMedicine'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('medicineId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "removeMedicine", null);
__decorate([
    (0, common_1.Post)('updateMedicine'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('medicineId', new common_1.ValidationPipe({ transform: true }))),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId, pharmacist_dto_1.UpdateMedicineDto]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "updateMedicine", null);
__decorate([
    (0, common_1.Get)('getPharmacist'),
    __param(0, (0, common_1.Query)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getPharmacist", null);
__decorate([
    (0, common_1.Get)('approvedPharmacists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getApprovedPharmacists", null);
__decorate([
    (0, common_1.Get)('pendingPharmacists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getPendingPharmacists", null);
__decorate([
    (0, common_1.Get)('getAllPharmacists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getAllPharmacists", null);
__decorate([
    (0, common_1.Delete)('deletePharmacist'),
    __param(0, (0, common_1.Query)('walletAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "deletePharmacistByAddress", null);
__decorate([
    (0, common_1.Get)('getMedicine'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Query)('medicineId', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getMedicine", null);
__decorate([
    (0, common_1.Get)('getAllMedicines'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getAllMedicines", null);
__decorate([
    (0, common_1.Get)('getInventory'),
    __param(0, (0, common_1.Query)('walletAddress', new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PharmacistController.prototype, "getInventory", null);
exports.PharmacistController = PharmacistController = __decorate([
    (0, common_1.Controller)('pharmacist'),
    __metadata("design:paramtypes", [pharmacist_service_1.PharmacistService])
], PharmacistController);
//# sourceMappingURL=pharmacist.controller.js.map