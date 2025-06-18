"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const my_logger_module_1 = require("./modules/my-logger/my-logger.module");
const patient_module_1 = require("./modules/patient/patient.module");
const admin_module_1 = require("./modules/admin/admin.module");
const hospital_module_1 = require("./modules/hospital/hospital.module");
const doctor_module_1 = require("./modules/doctor/doctor.module");
const pharmacist_module_1 = require("./modules/pharmacist/pharmacist.module");
const otp_module_1 = require("./modules/otp/otp.module");
const termill_module_1 = require("./modules/termill/termill.module");
const postmark_module_1 = require("./modules/postmark/postmark.module");
const configify_1 = require("@itgorillaz/configify");
const encryption_module_1 = require("./shared/utils/encryption/encryption.module");
const config_1 = require("@nestjs/config");
const config_2 = require("./shared/config/config");
const event_emitter_1 = require("@nestjs/event-emitter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                load: [config_2.default],
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 1,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    uri: config.get('database.mongodb_uri'),
                    dbName: config.get('database.dbName'),
                }),
                inject: [config_1.ConfigService],
            }),
            my_logger_module_1.MyLoggerModule,
            patient_module_1.PatientModule,
            admin_module_1.AdminModule,
            hospital_module_1.HospitalModule,
            doctor_module_1.DoctorModule,
            pharmacist_module_1.PharmacistModule,
            otp_module_1.OtpModule,
            termill_module_1.TermillModule,
            postmark_module_1.PostmarkModule,
            encryption_module_1.EncryptionModule,
            configify_1.ConfigifyModule.forRootAsync(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map