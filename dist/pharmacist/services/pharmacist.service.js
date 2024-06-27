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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacistService = void 0;
const common_1 = require("@nestjs/common");
const pharmacist_dao_1 = require("../dao/pharmacist.dao");
const pharmacist_guard_1 = require("../guards/pharmacist.guard");
const shared_1 = require("../../shared");
const hospital_dao_1 = require("../../hospital/dao/hospital.dao");
const mongoose_1 = require("mongoose");
let PharmacistService = class PharmacistService {
    constructor(pharmacistDao, pharmacistGuard, hospitalDao) {
        this.pharmacistDao = pharmacistDao;
        this.pharmacistGuard = pharmacistGuard;
        this.hospitalDao = hospitalDao;
    }
    async createPharmacist(args) {
        const pharmacistExists = await this.pharmacistGuard.validatePharmacistExists(args.walletAddress);
        if (pharmacistExists) {
            return {
                success: shared_1.ErrorCodes.Error,
                message: 'Pharmacist already exists',
            };
        }
        if (await this.pharmacistGuard.validatePharmacistExistsInHospital(args.hospitalIds, args.walletAddress)) {
            throw new shared_1.PharmacistError('Pharmacist already exists in hospital');
        }
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(args.hospitalIds);
            if (!hospital) {
                throw new shared_1.PharmacistError("Hospital doesn't exist");
            }
            await this.pharmacistDao.createNewPharmacist(args);
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(args.walletAddress);
            pharmacist.hospitalIds.push(args.hospitalIds);
            const pharmacistPreview = {
                walletAddress: pharmacist.walletAddress,
                hospitalIds: pharmacist.hospitalIds,
                profilePicture: pharmacist.profilePicture,
                name: pharmacist.name,
                status: pharmacist.status,
                category: shared_1.Category.Pharmacist,
            };
            try {
                hospital.pharmacists.push(pharmacistPreview);
            }
            catch (error) {
                await this.pharmacistDao.deletePharmacist(pharmacist.walletAddress);
                throw new shared_1.PharmacistError('Error adding pharmacist to hospital');
            }
            await pharmacist.save();
            await hospital.save();
            return {
                success: shared_1.ErrorCodes.Success,
                pharmacist,
                message: 'Pharmacist created successfully',
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError)
                throw new mongoose_1.MongooseError(error.message);
            throw new shared_1.PharmacistError('An error ocurred while creating pharmacist');
        }
    }
    async getPendingPharmacists() {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistWithPendingStatus();
            if (!pharmacist || pharmacist.length === 0) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    pharmacist: [],
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                pharmacist,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error fetching pharmacists');
        }
    }
    async getApprovedPharmacists() {
        try {
            const pharmacists = await this.pharmacistDao.fetchPharmacistsWithApprovedStatus();
            if (!pharmacists || pharmacists.length === 0) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    pharmacists: [],
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                pharmacists,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error fetching pharmacists');
        }
    }
    async getPharmacistByAddress(address) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(address);
            if (!pharmacist) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    message: 'Pharmacist does not exist',
                };
            }
            return {
                success: shared_1.ErrorCodes.Success,
                pharmacist: pharmacist,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError)
                throw new mongoose_1.MongooseError(error.message);
            throw new shared_1.PharmacistError('Error fetching pharmacist');
        }
    }
    async getAllPharmacists() {
        return await this.pharmacistDao.fetchAllPharmacists();
    }
    async updatePharmacist(walletAddress, args) {
        try {
            const pharmacistExist = await this.pharmacistGuard.validatePharmacistExists(walletAddress);
            if (!pharmacistExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Pharmacist does not exist',
                };
            }
            const pharmacist = await this.pharmacistDao.updatePharmacist(walletAddress, args);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Pharmacist updated successfully',
                pharmacist,
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError)
                throw new mongoose_1.MongooseError(error.message);
            throw new shared_1.PharmacistError('Error updating pharmacist');
        }
    }
    async deletePharmacist(walletAddress) {
        try {
            const pharmacistExist = await this.pharmacistGuard.validatePharmacistExists(walletAddress);
            if (!pharmacistExist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'pharmacist not found',
                };
            }
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            const hospitalIds = pharmacist.hospitalIds;
            await this.hospitalDao.pullManyPharmacists(hospitalIds, walletAddress);
            await this.pharmacistDao.deletePharmacist(walletAddress);
            return {
                success: common_1.HttpStatus.OK,
                message: 'pharmacist deleted successfully',
            };
        }
        catch (error) {
            console.error(error);
            if (error instanceof mongoose_1.MongooseError)
                throw new mongoose_1.MongooseError(error.message);
            throw new shared_1.PharmacistError('Error deleting pharmacist');
        }
    }
};
exports.PharmacistService = PharmacistService;
exports.PharmacistService = PharmacistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pharmacist_dao_1.PharmacistDao,
        pharmacist_guard_1.PharmacistGuard,
        hospital_dao_1.HospitalDao])
], PharmacistService);
//# sourceMappingURL=pharmacist.service.js.map