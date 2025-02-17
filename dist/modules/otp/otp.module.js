"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModule = void 0;
const common_1 = require("@nestjs/common");
const otp_service_1 = require("./services/otp.service");
const otp_controller_1 = require("./controller/otp/otp.controller");
const mongoose_1 = require("@nestjs/mongoose");
const otp_schema_1 = require("./schema/otp.schema");
const otp_dao_1 = require("./dao/otp.dao");
const patient_module_1 = require("../patient/patient.module");
const doctor_module_1 = require("../doctor/doctor.module");
const pharmacist_module_1 = require("../pharmacist/pharmacist.module");
const postmark_module_1 = require("../postmark/postmark.module");
const hospital_module_1 = require("../hospital/hospital.module");
const admin_module_1 = require("../admin/admin.module");
let OtpModule = class OtpModule {
};
exports.OtpModule = OtpModule;
exports.OtpModule = OtpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: otp_schema_1.Otp.name, schema: otp_schema_1.OtpSchema }]),
            (0, common_1.forwardRef)(() => patient_module_1.PatientModule),
            (0, common_1.forwardRef)(() => doctor_module_1.DoctorModule),
            (0, common_1.forwardRef)(() => pharmacist_module_1.PharmacistModule),
            (0, common_1.forwardRef)(() => hospital_module_1.HospitalModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            postmark_module_1.PostmarkModule,
        ],
        providers: [otp_service_1.OtpService, otp_dao_1.OtpDao],
        controllers: [otp_controller_1.OtpController],
        exports: [otp_service_1.OtpService, otp_dao_1.OtpDao],
    })
], OtpModule);
//# sourceMappingURL=otp.module.js.map