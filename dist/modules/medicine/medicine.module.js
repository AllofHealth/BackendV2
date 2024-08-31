"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineModule = void 0;
const common_1 = require("@nestjs/common");
const medicine_dao_1 = require("./dao/medicine.dao");
const mongoose_1 = require("@nestjs/mongoose");
const medicine_schema_1 = require("./schema/medicine.schema");
const medicine_service_1 = require("./service/medicine.service");
const medicine_controller_1 = require("./controller/medicine.controller");
let MedicineModule = class MedicineModule {
};
exports.MedicineModule = MedicineModule;
exports.MedicineModule = MedicineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: medicine_schema_1.Medication.name, schema: medicine_schema_1.MedicineSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: medicine_schema_1.Receipt.name, schema: medicine_schema_1.ReceiptSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: medicine_schema_1.Medication.name, schema: medicine_schema_1.MedicineSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: medicine_schema_1.MedicineCategories.name, schema: medicine_schema_1.MedicineCategoriesSchema },
            ]),
        ],
        providers: [medicine_dao_1.MedicineDao, medicine_service_1.MedicineService],
        exports: [medicine_dao_1.MedicineDao],
        controllers: [medicine_controller_1.MedicineController],
    })
], MedicineModule);
//# sourceMappingURL=medicine.module.js.map