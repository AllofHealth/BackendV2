"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModule = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("./services/patient.service");
const patient_controller_1 = require("./controllers/patient.controller");
const patient_schema_1 = require("./schemas/patient.schema");
const patient_dao_1 = require("./dao/patient.dao");
const patient_guard_1 = require("./guards/patient.guard");
const mongoose_1 = require("@nestjs/mongoose");
const pharmacist_module_1 = require("../pharmacist/pharmacist.module");
const doctor_module_1 = require("../doctor/doctor.module");
const otp_module_1 = require("../otp/otp.module");
const doctor_schema_1 = require("../doctor/schema/doctor.schema");
let PatientModule = class PatientModule {
};
exports.PatientModule = PatientModule;
exports.PatientModule = PatientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: patient_schema_1.Patient.name, schema: patient_schema_1.PatientSchema }]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: patient_schema_1.FamilyMember.name,
                    schema: patient_schema_1.FamilyMemberSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: patient_schema_1.Prescriptions.name, schema: patient_schema_1.PrescriptionsSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: doctor_schema_1.Approval.name, schema: doctor_schema_1.ApprovalSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: doctor_schema_1.Doctor.name, schema: doctor_schema_1.DoctorSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: patient_schema_1.MedicalRecordPreview.name, schema: patient_schema_1.MedicalRecordPreviewSchema },
            ]),
            (0, common_1.forwardRef)(() => pharmacist_module_1.PharmacistModule),
            (0, common_1.forwardRef)(() => doctor_module_1.DoctorModule),
            otp_module_1.OtpModule,
        ],
        providers: [patient_service_1.PatientService, patient_dao_1.PatientDao, patient_guard_1.PatientGuard],
        controllers: [patient_controller_1.PatientController],
        exports: [patient_service_1.PatientService, patient_dao_1.PatientDao, patient_guard_1.PatientGuard],
    })
], PatientModule);
//# sourceMappingURL=patient.module.js.map