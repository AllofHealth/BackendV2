"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalModule = void 0;
const common_1 = require("@nestjs/common");
const hospital_service_1 = require("./services/hospital.service");
const hospital_controller_1 = require("./controllers/hospital.controller");
const hospital_schema_1 = require("./schema/hospital.schema");
const hospital_dao_1 = require("./dao/hospital.dao");
const mongoose_1 = require("@nestjs/mongoose");
const hospital_guard_1 = require("./guard/hospital.guard");
const doctor_module_1 = require("../doctor/doctor.module");
const pharmacist_module_1 = require("../pharmacist/pharmacist.module");
const encryption_module_1 = require("../../shared/utils/encryption/encryption.module");
const hospital_approved_guard_1 = require("./guard/hospital.approved.guard");
const hospital_auth_guard_1 = require("./guard/hospital.auth.guard");
let HospitalModule = class HospitalModule {
};
exports.HospitalModule = HospitalModule;
exports.HospitalModule = HospitalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: hospital_schema_1.Hospital.name, schema: hospital_schema_1.HospitalSchema },
            ]),
            doctor_module_1.DoctorModule,
            (0, common_1.forwardRef)(() => pharmacist_module_1.PharmacistModule),
            encryption_module_1.EncryptionModule,
        ],
        providers: [
            hospital_service_1.HospitalService,
            hospital_dao_1.HospitalDao,
            hospital_guard_1.HospitalGuard,
            hospital_approved_guard_1.HospitalApprovedGuard,
            hospital_auth_guard_1.HospitalAuthGuard,
        ],
        controllers: [hospital_controller_1.HospitalController],
        exports: [hospital_service_1.HospitalService, hospital_dao_1.HospitalDao, hospital_guard_1.HospitalGuard, hospital_approved_guard_1.HospitalApprovedGuard],
    })
], HospitalModule);
//# sourceMappingURL=hospital.module.js.map