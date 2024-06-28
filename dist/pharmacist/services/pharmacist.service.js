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
const constants_1 = require("../../shared/constants");
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
        try {
            const pharmacists = await this.pharmacistDao.fetchAllPharmacists();
            if (!pharmacists) {
                return {
                    success: shared_1.ErrorCodes.NotFound,
                    pharmacists: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                pharmacists,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error fetching pharmacists');
        }
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
    async addMedicine(walletAddress, args) {
        const { name, price, quantity, description, sideEffects, image, medicineGroup, } = args;
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'Pharmacist does not exist',
                };
            }
            if (pharmacist.status !== shared_1.ApprovalStatus.Approved) {
                return {
                    success: common_1.HttpStatus.FORBIDDEN,
                    message: 'Pharmacist is not approved',
                };
            }
            const inventory = pharmacist.inventory;
            if (!inventory) {
                const medicine = await this.pharmacistDao.createMedicine({
                    name,
                    price,
                    quantity,
                    description,
                    sideEffects: sideEffects ? sideEffects : 'No side effects',
                    image: image ? image : constants_1.MEDICINE_PLACEHOLDER,
                    medicineGroup,
                });
                const newInventory = await this.pharmacistDao.createInventory({
                    numberOfMedicine: quantity,
                    numberOfMedicineGroup: 1,
                    numberOfMedicineSold: 0,
                    medicines: [medicine],
                });
                pharmacist.inventory = newInventory;
                await pharmacist.save();
                return {
                    success: common_1.HttpStatus.OK,
                    message: 'Medicine added successfully',
                };
            }
            const existingMedicine = inventory.medicines.find((medicine) => medicine.name === name && medicine.medicineGroup === medicineGroup);
            if (existingMedicine) {
                existingMedicine.price = price;
                existingMedicine.description = description;
                existingMedicine.sideEffects = sideEffects
                    ? sideEffects
                    : 'No side effects';
                existingMedicine.quantity += quantity;
                inventory.numberOfMedicine += quantity;
            }
            else {
                const medicine = await this.pharmacistDao.createMedicine({
                    name,
                    price,
                    quantity,
                    description,
                    sideEffects: sideEffects ? sideEffects : 'No side effects',
                    image: image ? image : constants_1.MEDICINE_PLACEHOLDER,
                    medicineGroup,
                });
                inventory.numberOfMedicineGroup += 1;
                inventory.numberOfMedicine += quantity;
                inventory.medicines.push(medicine);
            }
            await pharmacist.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'Medicine added successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error adding medicine');
        }
    }
    async deleteMedicine(walletAddress, medicineId) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'pharmacist not found',
                };
            }
            const inventory = pharmacist.inventory;
            if (!inventory) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'inventory not found',
                };
            }
            const medicine = await this.pharmacistDao.findMedicineById(medicineId);
            if (!medicine) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'medicine not found',
                };
            }
            const medicineExistInInventory = inventory.medicines.find((medicine) => medicine._id.toString() === medicineId.toString());
            if (!medicineExistInInventory) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'medicine not found in inventory',
                };
            }
            inventory.numberOfMedicine -= medicine.quantity;
            await this.pharmacistDao.pullMedicineById(walletAddress, medicineId);
            await this.pharmacistDao.deleteMedicineById(medicineId);
            await pharmacist.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'Medicine deleted successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error deleting medicine');
        }
    }
    async fetchMedicine(walletAddress, medicineId) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'pharmacist not found',
                };
            }
            const inventory = pharmacist.inventory;
            if (!inventory) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'inventory not found',
                };
            }
            const medicine = await this.pharmacistDao.findMedicineById(medicineId);
            if (!medicine) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'medicine not found',
                };
            }
            const medicineExistInInventory = inventory.medicines.find((medicine) => medicine._id.toString() === medicineId.toString());
            if (!medicineExistInInventory) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'medicine not found in inventory',
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                medicine,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error fetching medicine');
        }
    }
    async fetchAllMedicine(walletAddress) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'pharmacist not found',
                };
            }
            const inventory = pharmacist.inventory;
            if (!inventory) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'inventory not found',
                };
            }
            const medicines = inventory.medicines;
            if (medicines.length === 0) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    medicines: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                medicines,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error fetching all medicine');
        }
    }
    async fetchInventory(walletAddress) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'pharmacist not found',
                };
            }
            const inventory = pharmacist.inventory;
            if (!inventory) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    inventory: {},
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                inventory,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error fetching inventory');
        }
    }
    async updateMedicine(walletAddress, medicineId, args) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'pharmacist not found',
                };
            }
            const inventory = pharmacist.inventory;
            if (!inventory) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'inventory not found',
                };
            }
            const medicine = inventory.medicines.find((medicine) => medicine._id.toString() === medicineId.toString());
            if (!medicine) {
                return {
                    success: common_1.HttpStatus.NOT_FOUND,
                    message: 'medicine not found',
                };
            }
            const updateMedicine = await this.pharmacistDao.updateMedicine(walletAddress, medicineId, args);
            await pharmacist.save();
            const totalNumberOfMedicine = inventory.medicines.reduce((total, medicine) => total + medicine.quantity, 0);
            inventory.numberOfMedicine = totalNumberOfMedicine;
            await pharmacist.save();
            return {
                success: common_1.HttpStatus.OK,
                updateMedicine,
            };
        }
        catch (error) {
            console.error('Error updating medicine');
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