"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./services/admin.service");
const admin_controller_1 = require("./controllers/admin.controller");
const admin_schema_1 = require("./schema/admin.schema");
const admin_dao_1 = require("./dao/admin.dao");
const admin_guard_1 = require("./guards/admin.guard");
const mongoose_1 = require("@nestjs/mongoose");
const hospital_module_1 = require("../hospital/hospital.module");
const doctor_module_1 = require("../doctor/doctor.module");
const pharmacist_module_1 = require("../pharmacist/pharmacist.module");
const otp_module_1 = require("../otp/otp.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: admin_schema_1.Admin.name, schema: admin_schema_1.AdminSchema }]),
            (0, common_1.forwardRef)(() => hospital_module_1.HospitalModule),
            (0, common_1.forwardRef)(() => doctor_module_1.DoctorModule),
            (0, common_1.forwardRef)(() => pharmacist_module_1.PharmacistModule),
            (0, common_1.forwardRef)(() => otp_module_1.OtpModule),
        ],
        providers: [admin_service_1.AdminService, admin_dao_1.AdminDao, admin_guard_1.AdminGuard],
        controllers: [admin_controller_1.AdminController],
        exports: [admin_service_1.AdminService, admin_dao_1.AdminDao],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map