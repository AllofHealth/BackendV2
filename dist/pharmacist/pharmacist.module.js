"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacistModule = void 0;
const common_1 = require("@nestjs/common");
const pharmacist_service_1 = require("./services/pharmacist.service");
const pharmacist_controller_1 = require("./controllers/pharmacist.controller");
const pharmacist_schema_1 = require("./schema/pharmacist.schema");
const mongoose_1 = require("@nestjs/mongoose");
const hospital_module_1 = require("../hospital/hospital.module");
const pharmacist_dao_1 = require("./dao/pharmacist.dao");
const pharmacist_guard_1 = require("./guards/pharmacist.guard");
let PharmacistModule = class PharmacistModule {
};
exports.PharmacistModule = PharmacistModule;
exports.PharmacistModule = PharmacistModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: pharmacist_schema_1.Pharmacist.name, schema: pharmacist_schema_1.PharmacistSchema },
            ]),
            (0, common_1.forwardRef)(() => hospital_module_1.HospitalModule),
        ],
        providers: [pharmacist_service_1.PharmacistService, pharmacist_dao_1.PharmacistDao, pharmacist_guard_1.PharmacistGuard],
        controllers: [pharmacist_controller_1.PharmacistController],
        exports: [pharmacist_dao_1.PharmacistDao, pharmacist_guard_1.PharmacistGuard, pharmacist_service_1.PharmacistService],
    })
], PharmacistModule);
//# sourceMappingURL=pharmacist.module.js.map