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
exports.MedicineController = void 0;
const common_1 = require("@nestjs/common");
const medicine_service_1 = require("../service/medicine.service");
let MedicineController = class MedicineController {
    constructor(medicineService) {
        this.medicineService = medicineService;
    }
    async initCategory() {
        return await this.medicineService.createCategories();
    }
    async addCategory(category) {
        return await this.addCategory(category);
    }
    async fetchCategories() {
        return await this.medicineService.getCategories();
    }
};
exports.MedicineController = MedicineController;
__decorate([
    (0, common_1.Post)('initializeCategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "initCategory", null);
__decorate([
    (0, common_1.Post)('addNewCategory'),
    __param(0, (0, common_1.Query)('category', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Get)('fetchCategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "fetchCategories", null);
exports.MedicineController = MedicineController = __decorate([
    (0, common_1.Controller)('medicine'),
    __metadata("design:paramtypes", [medicine_service_1.MedicineService])
], MedicineController);
//# sourceMappingURL=medicine.controller.js.map