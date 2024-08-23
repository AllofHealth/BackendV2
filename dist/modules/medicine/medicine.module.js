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
let MedicineModule = class MedicineModule {
};
exports.MedicineModule = MedicineModule;
exports.MedicineModule = MedicineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: medicine_schema_1.Medicine.name, schema: medicine_schema_1.MedicineSchema },
            ]),
        ],
        providers: [medicine_dao_1.MedicineDao],
        exports: [medicine_dao_1.MedicineDao],
    })
], MedicineModule);
//# sourceMappingURL=medicine.module.js.map