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
exports.MedicineDao = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const medicine_schema_1 = require("../schema/medicine.schema");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../shared/constants");
let MedicineDao = class MedicineDao {
    constructor(medicine, categories) {
        this.medicine = medicine;
        this.categories = categories;
    }
    async createMedicine(args) {
        return await this.medicine.create(args);
    }
    async getAllCategories() {
        return await this.categories.find();
    }
    async createCategories() {
        return await this.categories.create({ category: constants_1.drugClasses });
    }
};
exports.MedicineDao = MedicineDao;
exports.MedicineDao = MedicineDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medicine_schema_1.Medication.name)),
    __param(1, (0, mongoose_1.InjectModel)(medicine_schema_1.MedicineCategories.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MedicineDao);
//# sourceMappingURL=medicine.dao.js.map