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
var PharmacistService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacistService = void 0;
const common_1 = require("@nestjs/common");
const pharmacist_dao_1 = require("../dao/pharmacist.dao");
const pharmacist_guard_1 = require("../guards/pharmacist.guard");
const shared_1 = require("../../../shared");
const hospital_dao_1 = require("../../hospital/dao/hospital.dao");
const mongoose_1 = require("mongoose");
const patient_dao_1 = require("../../patient/dao/patient.dao");
const medicine_interface_1 = require("../../medicine/interface/medicine.interface");
const medicine_service_1 = require("../../medicine/service/medicine.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const shared_events_1 = require("../../../shared/events/shared.events");
const shared_dto_1 = require("../../../shared/dto/shared.dto");
const my_logger_service_1 = require("../../my-logger/my-logger.service");
let PharmacistService = PharmacistService_1 = class PharmacistService {
    constructor(pharmacistDao, pharmacistGuard, hospitalDao, patientDao, medicineService, eventEmitter) {
        this.pharmacistDao = pharmacistDao;
        this.pharmacistGuard = pharmacistGuard;
        this.hospitalDao = hospitalDao;
        this.patientDao = patientDao;
        this.medicineService = medicineService;
        this.eventEmitter = eventEmitter;
        this.logger = new my_logger_service_1.MyLoggerService(PharmacistService_1.name);
    }
    async createPharmacist(args) {
        const pharmacistExists = await this.pharmacistGuard.validatePharmacistExists(args.walletAddress);
        if (pharmacistExists) {
            throw new common_1.HttpException({ message: 'pharmacist already exists' }, common_1.HttpStatus.CONFLICT);
        }
        if (await this.pharmacistGuard.validatePharmacistExistsInHospital(args.hospitalIds, args.walletAddress)) {
            throw new common_1.HttpException({ message: 'address already exists in this institution' }, common_1.HttpStatus.CONFLICT);
        }
        try {
            const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(args.hospitalIds);
            if (!hospital) {
                throw new common_1.HttpException({ message: 'institution not found' }, common_1.HttpStatus.NOT_FOUND);
            }
            await this.pharmacistDao.createNewPharmacist(args);
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(args.walletAddress);
            pharmacist.hospitalIds.push(args.hospitalIds);
            const pharmacistPreview = {
                id: pharmacist.id,
                walletAddress: pharmacist.walletAddress,
                hospitalIds: pharmacist.hospitalIds,
                profilePicture: pharmacist.profilePicture,
                name: pharmacist.name,
                status: pharmacist.status,
                category: shared_1.Category.Pharmacist,
            };
            try {
                hospital.pharmacists.push(pharmacistPreview);
                this.eventEmitter.emit(shared_events_1.SharedEvents.ENTITY_CREATED, new shared_dto_1.EntityCreatedDto(args.walletAddress, pharmacist.email, 'pharmacist'));
            }
            catch (error) {
                await this.pharmacistDao.deletePharmacist(pharmacist.walletAddress);
                throw new common_1.HttpException({ message: 'an error occurred while joining institution' }, common_1.HttpStatus.BAD_REQUEST);
            }
            await pharmacist.save();
            await hospital.save();
            return {
                success: common_1.HttpStatus.OK,
                pharmacist,
                message: 'Pharmacist created successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while creating pharmacist',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
            const pharmacist = await this.pharmacistDao.updatePharmacist(walletAddress, args);
            return {
                success: common_1.HttpStatus.OK,
                message: 'Pharmacist updated successfully',
                pharmacist,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('an error occurred while updating pharmacist', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePharmacist(walletAddress) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            await this.hospitalDao.pullManyPharmacists(pharmacist.hospitalIds, walletAddress);
            await this.pharmacistDao.deletePharmacist(walletAddress);
            return {
                success: common_1.HttpStatus.OK,
                message: 'pharmacist deleted successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while deleting pharmacist',
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchClassDescription(category) {
        const drugCategory = medicine_interface_1.drugClassesDescription.find((Category) => Category.name.toLowerCase() === category.toLowerCase());
        if (!drugCategory) {
            await this.medicineService.addNewCategory(category);
            return 'none';
        }
        const description = drugCategory.description;
        console.log(description);
        return description;
    }
    capitalizeFirstLetter(word) {
        if (!word)
            return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    async initMedication(args) {
        try {
            const medicine = await this.pharmacistDao.createMedicine(args);
            if (!medicine) {
                throw new common_1.HttpException({ message: 'an error occurred while creating medicine' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return medicine;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while initializing medication',
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async initInventory() {
        try {
            const inventory = await this.pharmacistDao.createInventory();
            if (!inventory)
                throw new common_1.HttpException('an error occurred while creating inventory', common_1.HttpStatus.BAD_REQUEST);
            return inventory;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while initializing inventory',
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async handleNoInventoryCreated(walletAddress, category, args) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            const inventory = await this.initInventory();
            pharmacist.inventory = inventory;
            await pharmacist.save();
            const medicine = await this.initMedication(args);
            const product = await this.pharmacistDao.createProduct({
                category: this.capitalizeFirstLetter(category),
                description: await this.fetchClassDescription(category),
                medications: [medicine],
            });
            console.log(product);
            if (!product) {
                throw new common_1.HttpException({
                    message: 'an error occurred while adding medication to inventory',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            pharmacist.inventory.products.push(product);
            await pharmacist.save();
            pharmacist.inventory.numberOfCategories = 1;
            pharmacist.inventory.numberOfMedicine = 1;
            await pharmacist.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'added medication to inventory successfully',
            };
        }
        catch (error) {
            console.error(error);
        }
    }
    async handleInventoryUpdate(args) {
        const { pharmacistAddress, category, medicineName, quantity } = args;
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
            const inventory = pharmacist.inventory;
            const productIndex = pharmacist.inventory.products.findIndex((prod) => prod.category.toLowerCase() === category.toLowerCase());
            console.log(`inventory updated product ${productIndex}`);
            const medication = inventory.products[productIndex].medications.find((_med) => _med.name.toLowerCase() === medicineName.toLowerCase());
            console.log(`inventory updated medication ${medication}`);
            medication.quantity -= quantity;
            inventory.numberOfMedicine -= quantity;
            inventory.numberOfMedicineSold += quantity;
            await pharmacist.save();
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while updating inventory after dispense',
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addMedicine(walletAddress, category, args) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist.inventory) {
                await this.handleNoInventoryCreated(walletAddress, category, args);
            }
            else {
                const productIndex = pharmacist.inventory.products.findIndex((prod) => prod.category.toLowerCase() === category.toLowerCase());
                if (productIndex === -1) {
                    const medicine = await this.initMedication(args);
                    const newProduct = await this.pharmacistDao.createProduct({
                        category: this.capitalizeFirstLetter(category),
                        description: await this.fetchClassDescription(category),
                        medications: [medicine],
                    });
                    pharmacist.inventory.products.push(newProduct);
                }
                else {
                    const medication = pharmacist.inventory.products[productIndex].medications.find((_med) => _med.name.toLowerCase() === args.name.toLowerCase());
                    if (medication) {
                        medication.quantity += args.quantity;
                        await pharmacist.save();
                    }
                    else {
                        const medicine = await this.initMedication(args);
                        pharmacist.inventory.products[productIndex].medications.push(medicine);
                    }
                }
                pharmacist.inventory.numberOfCategories =
                    pharmacist.inventory.products.length;
                pharmacist.inventory.numberOfMedicine += args.quantity;
                await pharmacist.save();
                return {
                    success: common_1.HttpStatus.OK,
                    message: 'added medication to inventory successfully',
                };
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while adding medication',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteMedicine(args) {
        const { walletAddress, productId, medicineId } = args;
        try {
            const result = await this.pharmacistDao.pullMedicineById(walletAddress, productId, medicineId);
            return {
                success: common_1.HttpStatus.OK,
                message: 'successfully deleted medication from inventory',
                result,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: 'an error occurred while deleting medication' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchMedicine(args) {
        const { walletAddress, productId, medicineId } = args;
        try {
            const medicine = await this.pharmacistDao.findMedicineById(walletAddress, medicineId, productId);
            if (!medicine) {
                throw new common_1.HttpException({ message: 'an error occurred while fetching medicine' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return medicine;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: 'an error occurred while fetching medication' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchAllProducts(walletAddress) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            if (!pharmacist.inventory) {
                return {
                    message: 'no products added',
                    success: common_1.HttpStatus.NOT_FOUND,
                };
            }
            const products = pharmacist.inventory.products;
            return {
                success: common_1.HttpStatus.OK,
                message: 'successfully fetched all products',
                products,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: 'an error occurred while fetching all products' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchProduct(args) {
        const { walletAddress, productId } = args;
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            const inventory = pharmacist.inventory;
            if (!inventory) {
                throw new common_1.HttpException({ message: 'no products added' }, common_1.HttpStatus.NOT_FOUND);
            }
            const product = await this.pharmacistDao.fetchProductById(productId, walletAddress);
            if (!product) {
                throw new common_1.HttpException({ message: 'product not found' }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: common_1.HttpStatus.OK,
                message: 'successfully fetched product',
                product,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while fetching product',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchInventory(walletAddress) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            const inventory = pharmacist.inventory;
            if (!inventory) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'no products found',
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
    async updateMedicine(args, update) {
        const { walletAddress, productId, medicineId } = args;
        try {
            const data = await this.pharmacistDao.updateMedicine(walletAddress, medicineId, productId, update);
            if (!data) {
                throw new common_1.HttpException({ message: 'an error occurred while updating medication' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                success: common_1.HttpStatus.OK,
                message: 'successfully updated medication',
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: 'an error occurred while updating medication' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkMedicineExist(args) {
        const { walletAddress, category, productPrescribed } = args;
        try {
            const inventory = await this.fetchInventory(walletAddress);
            const product = inventory.inventory.products.find((prod) => prod.category === category);
            const medicine = product.medications.find((med) => med.name.toLowerCase() === productPrescribed.toLowerCase());
            let returnData;
            if (product && !medicine) {
                returnData = {
                    medicineExist: false,
                    categoryExist: true,
                    availableMedications: product.medications,
                };
            }
            else if (product && medicine) {
                returnData = {
                    medicineExist: true,
                    categoryExist: true,
                    availableMedications: [medicine],
                };
            }
            else {
                returnData = {
                    medicineExist: false,
                    categoryExist: false,
                    availableMedications: [],
                };
            }
            return {
                success: common_1.HttpStatus.OK,
                data: returnData,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({ message: 'an error occurred while checking medication' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchAllSharedPrescriptions(walletAddress) {
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            const prescriptions = pharmacist.sharedPrescriptions;
            if (!prescriptions) {
                throw new common_1.HttpException({ message: 'prescription not found' }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: common_1.HttpStatus.OK,
                prescriptions,
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error fetching all shared prescriptions');
        }
    }
    async fetchPrescriptionById(args) {
        const { walletAddress, prescriptionId } = args;
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            const prescription = pharmacist.sharedPrescriptions.find((prescription) => prescription._id.toString() === prescriptionId.toString());
            if (!prescription) {
                throw new common_1.HttpException({ message: 'prescription not found' }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: common_1.HttpStatus.OK,
                prescription,
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('Error fetching prescription');
        }
    }
    async dispensePrescription(args) {
        const { patientAddress, pharmacistAddress, medicineId, productToDispense, directions, quantity, } = args;
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
            const sharedPrescription = pharmacist.sharedPrescriptions;
            if (sharedPrescription.length < 1) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'no prescription found',
                };
            }
            const prescription = sharedPrescription.find((prescription) => prescription.patientAddress === patientAddress);
            if (!prescription) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'no prescription associated with patient found',
                };
            }
            const medicine = prescription.medicine.find((med) => med._id.toString().toLowerCase() ===
                medicineId.toString().toLowerCase());
            if (!medicine) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'invalid medicine id',
                };
            }
            console.log(medicine);
            const result = await this.checkMedicineExist({
                walletAddress: pharmacistAddress,
                category: medicine.productCategory,
                productPrescribed: medicine.productPrescribed,
            });
            console.log(result);
            if (!result.data.categoryExist ||
                (!result.data.medicineExist &&
                    result.data.availableMedications.length < 1)) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'product not available',
                };
            }
            const availableMed = result.data.availableMedications
                .flat()
                .find((med) => med.name.toLowerCase() === productToDispense.toLowerCase());
            console.log(availableMed);
            if (!availableMed) {
                return {
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'no available medication found',
                };
            }
            const medicationPrice = availableMed.price;
            console.log(medicationPrice);
            console.log(availableMed.quantity);
            if (availableMed.quantity < quantity || 0) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'invalid quantity selected or out of stock',
                };
            }
            const prescriptionReceipt = await this.medicineService.createPrescriptionReceipt({
                productDispensed: productToDispense,
                directions,
                quantity: String(quantity),
                price: String(medicationPrice * quantity),
            });
            console.log(`prescriptionReceipt: ${prescriptionReceipt.receipt}`);
            if (!prescriptionReceipt.receipt) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'an error occurred while creating receipt',
                };
            }
            const patient = await this.patientDao.fetchPatientByAddress(patientAddress);
            const patientPrescriptionData = patient.prescriptions.find((_prescription) => _prescription._id.toString().toLowerCase() ===
                prescription._id.toString().toLowerCase());
            console.log(`patient prescription data : ${patientPrescriptionData}`);
            const medicationData = patientPrescriptionData.medicine.find((med) => med._id.toString().toLowerCase() ===
                medicine._id.toString().toLowerCase());
            console.log(`patient medication data: ${medicationData}`);
            medicationData.receipt = prescriptionReceipt.receipt;
            medicationData.isDispensed = true;
            await this.handleInventoryUpdate({
                pharmacistAddress,
                category: medicine.productCategory,
                medicineName: productToDispense,
                quantity,
            });
            await patient.save();
            await pharmacist.save();
            await this.removePrescription({
                walletAddress: pharmacistAddress,
                prescriptionId: prescription._id,
            });
            return {
                success: common_1.HttpStatus.OK,
                message: 'dispense successful',
                data: {
                    productName: productToDispense,
                    quantity,
                    price: String(medicationPrice * quantity),
                },
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                message: 'an error occurred while dispensing prescription',
                error: error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removePrescription(args) {
        const { walletAddress, prescriptionId } = args;
        try {
            const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
            const prescription = pharmacist.sharedPrescriptions.find((p) => p._id.toString() === prescriptionId.toString());
            if (!prescription) {
                throw new common_1.HttpException({ message: 'prescription not found' }, common_1.HttpStatus.NOT_FOUND);
            }
            await this.pharmacistDao.pullOnePrescription(walletAddress, prescriptionId);
            await pharmacist.save();
            return {
                success: common_1.HttpStatus.OK,
                message: 'Prescription removed successfully',
            };
        }
        catch (error) {
            console.error(error);
            throw new shared_1.PharmacistError('Error removing prescription');
        }
    }
};
exports.PharmacistService = PharmacistService;
exports.PharmacistService = PharmacistService = PharmacistService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pharmacist_dao_1.PharmacistDao,
        pharmacist_guard_1.PharmacistGuard,
        hospital_dao_1.HospitalDao,
        patient_dao_1.PatientDao,
        medicine_service_1.MedicineService,
        event_emitter_1.EventEmitter2])
], PharmacistService);
//# sourceMappingURL=pharmacist.service.js.map