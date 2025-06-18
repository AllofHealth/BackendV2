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
var AdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_schema_1 = require("../schema/admin.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const shared_1 = require("../../../shared");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
const admin_dao_1 = require("../dao/admin.dao");
const admin_guard_1 = require("../guards/admin.guard");
const hospital_dao_1 = require("../../hospital/dao/hospital.dao");
const doctor_dao_1 = require("../../doctor/dao/doctor.dao");
const pharmacist_dao_1 = require("../../pharmacist/dao/pharmacist.dao");
const admin_data_1 = require("../data/admin.data");
const event_emitter_1 = require("@nestjs/event-emitter");
const shared_events_1 = require("../../../shared/events/shared.events");
const shared_dto_1 = require("../../../shared/dto/shared.dto");
let AdminService = AdminService_1 = class AdminService {
    constructor(adminModel, adminDao, adminGuard, hospitalDao, doctorDao, pharmacistDao, eventEmitter) {
        this.adminModel = adminModel;
        this.adminDao = adminDao;
        this.adminGuard = adminGuard;
        this.hospitalDao = hospitalDao;
        this.doctorDao = doctorDao;
        this.pharmacistDao = pharmacistDao;
        this.eventEmitter = eventEmitter;
        this.logger = new my_logger_service_1.MyLoggerService(AdminService_1.name);
    }
    async fetchAdminByAddress(walletAddress) {
        try {
            const admin = await this.adminDao.fetchAdminByAddress(walletAddress);
            if (!admin) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    message: admin_data_1.AdminErrors.NOT_FOUND,
                };
            }
            return admin;
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.FETCHING_ADMIN }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async isAdminAuthenticated(walletAddress) {
        let isAuthenticated = false;
        try {
            const admin = await this.adminDao.fetchAdminByAddress(walletAddress);
            if (!admin) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    message: admin_data_1.AdminErrors.NOT_FOUND,
                };
            }
            if (admin.isAuthenticated) {
                isAuthenticated = true;
            }
            return isAuthenticated;
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.AUTH_CHECK_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchAllAdmins() {
        try {
            const admins = await this.adminModel.find();
            if (!admins) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: admin_data_1.AdminErrors.NOT_FOUND,
                    data: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                data: admins,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.FETCHING_ADMIN }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async authenticateAdmin(args) {
        const { addressToAuthenticate, blockchainId } = args;
        try {
            const admin = await this.adminDao.fetchAdminByAddress(addressToAuthenticate);
            if (!admin) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: admin_data_1.AdminErrors.NOT_FOUND,
                };
            }
            admin.isAuthenticated = true;
            admin.id = blockchainId;
            await admin.save();
            return {
                success: common_1.HttpStatus.OK,
                message: admin_data_1.AdminMessages.AUTH_SUCCESSFUL,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.AUTH_ERROR }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createNewAdmin(args) {
        if (await this.adminDao.validateAdminExists(args.walletAddress)) {
            return {
                success: common_1.HttpStatus.CONFLICT,
                message: admin_data_1.AdminErrors.ADMIN_EXIST,
            };
        }
        try {
            const admin = await this.adminDao.createAdmin(args);
            try {
                this.eventEmitter.emit(shared_events_1.SharedEvents.ENTITY_CREATED, new shared_dto_1.EntityCreatedDto(args.walletAddress, admin.email, 'admin'));
            }
            catch (e) {
                this.logger.error(e.message);
                await this.adminDao.removeAdminByAddress(args.walletAddress);
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: admin_data_1.AdminErrors.CREATE_ADMIN,
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                message: admin_data_1.AdminMessages.CREATE_ADMIN,
                admin,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.CREATE_ADMIN }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAdmin(args) {
        const { adminAddressToRemove } = args;
        if (!(await this.adminGuard.validateAdmin(adminAddressToRemove))) {
            return {
                success: common_1.HttpStatus.UNAUTHORIZED,
            };
        }
        try {
            await this.adminDao.removeAdminByAddress(adminAddressToRemove);
            return {
                success: shared_1.ErrorCodes.Success,
                message: admin_data_1.AdminMessages.ADMIN_REMOVED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.ADMIN_REMOVED_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async approveHospital(args) {
        const { hospitalId } = args;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: admin_data_1.AdminErrors.HOSPITAL_NOT_FOUND,
                };
            }
            switch (hospital.status) {
                case shared_1.ApprovalStatus.Approved:
                    return {
                        success: common_1.HttpStatus.CONFLICT,
                        message: admin_data_1.AdminErrors.HOSPITAL_APPROVED_ALREADY,
                    };
                case shared_1.ApprovalStatus.Pending:
                    hospital.status = shared_1.ApprovalStatus.Approved;
                    await hospital.save();
                    break;
                default:
                    return {
                        success: common_1.HttpStatus.BAD_REQUEST,
                        message: admin_data_1.AdminErrors.INVALID_STATUS,
                    };
            }
            return {
                success: common_1.HttpStatus.OK,
                message: admin_data_1.AdminMessages.HOSPITAL_APPROVED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.HOSPITAL_APPROVE_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAdmin(args) {
        const { walletAddress, data } = args;
        try {
            await this.adminDao.updateAdmin(walletAddress, data);
            return {
                success: common_1.HttpStatus.OK,
                message: admin_data_1.AdminMessages.ADMIN_UPDATED,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.ADMIN_UPDATE_ERROR }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchAllPractitioners() {
        try {
            const allDoctors = await this.doctorDao.fetchAllDoctors();
            const allPharmacists = await this.pharmacistDao.fetchAllPharmacists();
            const fullList = [...allDoctors, ...allPharmacists];
            if (fullList.length === 0) {
                return {
                    success: common_1.HttpStatus.FOUND,
                    allPractitioners: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                allPractitioners: fullList,
            };
        }
        catch (e) {
            this.logger.error(e.message);
            throw new common_1.HttpException({ message: admin_data_1.AdminErrors.FETCHING_PRACTITIONERS }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = AdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        admin_dao_1.AdminDao,
        admin_guard_1.AdminGuard,
        hospital_dao_1.HospitalDao,
        doctor_dao_1.DoctorDao,
        pharmacist_dao_1.PharmacistDao,
        event_emitter_1.EventEmitter2])
], AdminService);
//# sourceMappingURL=admin.service.js.map