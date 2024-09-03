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
exports.MedicineService = void 0;
const common_1 = require("@nestjs/common");
const medicine_dao_1 = require("../dao/medicine.dao");
let MedicineService = class MedicineService {
    constructor(medicineDao) {
        this.medicineDao = medicineDao;
    }
    async getCategories() {
        try {
            const categories = await this.medicineDao.getAllCategories();
            if (!categories) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    categories: [],
                };
            }
            return categories[0].category;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('cannot fetch categories', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCategories() {
        try {
            const categories = await this.medicineDao.createCategories();
            if (!categories) {
                throw new common_1.HttpException('error creating categories', common_1.HttpStatus.CONFLICT);
            }
            return {
                status: common_1.HttpStatus.OK,
                categories,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('cannot create categories', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createPrescriptionReceipt(args) {
        try {
            const receipt = await this.medicineDao.createReceipt(args);
            if (!receipt) {
                throw new common_1.HttpException('error creating receipt', common_1.HttpStatus.CONFLICT);
            }
            return {
                status: common_1.HttpStatus.OK,
                receipt,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('cannot create receipt', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addNewCategory(args) {
        try {
            const categories = await this.medicineDao.getAllCategories();
            if (!categories) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    categories: [],
                };
            }
            categories[0].category.push(args);
            await categories[0].save();
            return {
                success: common_1.HttpStatus.OK,
                categories: categories[0].category,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('cannot fetch categories', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePrescriptionReceipt(id) {
        try {
            return this.medicineDao.deleteReceipt(id);
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: 'an error occurred while deleting receipt' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MedicineService = MedicineService;
exports.MedicineService = MedicineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [medicine_dao_1.MedicineDao])
], MedicineService);
//# sourceMappingURL=medicine.service.js.map