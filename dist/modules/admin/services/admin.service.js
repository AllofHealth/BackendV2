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
const otp_service_1 = require("../../otp/services/otp.service");
let AdminService = class AdminService {
    constructor(adminModel, adminDao, adminGuard, hospitalDao, doctorDao, pharmacistDao, otpService) {
        this.adminModel = adminModel;
        this.adminDao = adminDao;
        this.adminGuard = adminGuard;
        this.hospitalDao = hospitalDao;
        this.doctorDao = doctorDao;
        this.pharmacistDao = pharmacistDao;
        this.otpService = otpService;
        this.logger = new my_logger_service_1.MyLoggerService('AdminService');
    }
    async fetchAdminByAddress(walletAddress) {
        try {
            const admin = await this.adminDao.fetchAdminByAddress(walletAddress);
            if (!admin) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    message: 'Admin not found',
                };
            }
            return admin;
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_2.MongooseError) {
                throw new mongoose_2.MongooseError(error.message);
            }
            throw new Error('An error occurred while fetching admin');
        }
    }
    async isAdminAuthenticated(walletAddress) {
        let isAuthenticated = false;
        try {
            const admin = await this.adminDao.fetchAdminByAddress(walletAddress);
            if (!admin) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    message: 'Admin not found',
                };
            }
            if (admin.isAuthenticated) {
                isAuthenticated = true;
            }
            return isAuthenticated;
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_2.MongooseError) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException({ message: 'An error occurred while fetching admin' }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async fetchAllAdmins() {
        return await this.adminModel.find();
    }
    async authenticateAdmin(args) {
        const { addressToAuthenticate, blockchainId } = args;
        try {
            const admin = await this.adminDao.fetchAdminByAddress(addressToAuthenticate);
            if (!admin) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'admin not found',
                };
            }
            admin.isAuthenticated = true;
            admin.id = blockchainId;
            await admin.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'admin successfully authenticated',
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createNewAdmin(args) {
        if (await this.adminDao.validateAdminExists(args.walletAddress)) {
            return {
                success: common_1.HttpStatus.CREATED,
                message: 'admin already exists',
            };
        }
        try {
            const admin = await this.adminDao.createAdmin(args);
            try {
                await this.otpService.deliverOtp(args.walletAddress, args.email, 'admin');
            }
            catch (error) {
                await this.adminDao.removeAdminByAddress(args.walletAddress);
                return {
                    success: common_1.HttpStatus.BAD_REQUEST,
                    message: 'An error occurred while creating an admin',
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                admin,
                message: 'admin created successfully',
            };
        }
        catch (error) {
            this.logger.info('Error creating admin');
            throw new shared_1.AdminError('Error creating admin');
        }
    }
    async removeAdmin(args) {
        const { adminAddressToRemove } = args;
        if (!(await this.adminGuard.validateAdmin(adminAddressToRemove))) {
            return {
                success: common_1.HttpStatus.UNAUTHORIZED,
                message: 'Unauthorized',
            };
        }
        try {
            await this.adminDao.removeAdminByAddress(adminAddressToRemove);
            return {
                success: shared_1.ErrorCodes.Success,
                message: 'admin removed successfully',
            };
        }
        catch (error) {
            this.logger.info('Error removing admin');
            throw new shared_1.AdminError('Error removing admin');
        }
    }
    async approveHospital(args) {
        const { hospitalId } = args;
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
            if (!hospital) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Hospital not found',
                };
            }
            switch (hospital.status) {
                case shared_1.ApprovalStatus.Approved:
                    return {
                        success: common_1.HttpStatus.CREATED,
                        message: 'hospital already approved',
                    };
                case shared_1.ApprovalStatus.Pending:
                    hospital.status = shared_1.ApprovalStatus.Approved;
                    await hospital.save();
                    break;
                default:
                    return {
                        success: common_1.HttpStatus.BAD_REQUEST,
                        message: 'hospital status is invalid',
                    };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                message: 'Hospital approved successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.AdminError('Error approving hospital');
        }
    }
    async updateAdmin(args) {
        const { walletAddress, data } = args;
        try {
            const isAdmin = await this.adminGuard.validateAdmin(walletAddress);
            if (!isAdmin) {
                return {
                    success: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'not authorized',
                };
            }
            await this.adminDao.updateAdmin(walletAddress, data);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Admin updated successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.AdminError('Error updating admin');
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
        catch (error) {
            console.error(error);
            throw new shared_1.AdminError('Error fetching practitioners');
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        admin_dao_1.AdminDao,
        admin_guard_1.AdminGuard,
        hospital_dao_1.HospitalDao,
        doctor_dao_1.DoctorDao,
        pharmacist_dao_1.PharmacistDao,
        otp_service_1.OtpService])
], AdminService);
//# sourceMappingURL=admin.service.js.map