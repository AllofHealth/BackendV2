import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
import {
  CreatePharmacistType,
  DeleteMedicineInterface,
  DispenseHelper,
  DispenseMedicineInterface,
  FetchMedicineInterface,
  IHandleMedAvailability,
  IHandlePatientPrescriptionUpdate,
  MedicineType,
  PharmacistType,
  ProductType,
  ReturnMedicationStatus,
  UpdateMedicineType,
  UpdatePharmacistType,
} from '../interface/pharmacist.interface';
import { PharmacistGuard } from '../guards/pharmacist.guard';
import { Category, ErrorCodes, PharmacistError } from '@/shared';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { MongooseError, Types } from 'mongoose';
import { PatientDao } from '@/modules/patient/dao/patient.dao';

import {
  DrugClassDescriptionInterface,
  drugClassesDescription,
} from '@/modules/medicine/interface/medicine.interface';
import { MedicineService } from '@/modules/medicine/service/medicine.service';
import { Prescriptions } from '@/modules/patient/schemas/patient.schema';
import { Medication } from '@/modules/medicine/schema/medicine.schema';
import { PreviewType } from '@/modules/hospital/interface/hospital.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
// import { SharedEvents } from '@/shared/events/shared.events';
// import { EntityCreatedDto } from '@/shared/dto/shared.dto';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';

@Injectable()
export class PharmacistService {
  private logger = new MyLoggerService(PharmacistService.name);

  constructor(
    private readonly pharmacistDao: PharmacistDao,
    private readonly pharmacistGuard: PharmacistGuard,
    private readonly hospitalDao: HospitalDao,
    private readonly patientDao: PatientDao,
    private readonly medicineService: MedicineService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createPharmacist(args: CreatePharmacistType) {
    const pharmacistExists =
      await this.pharmacistGuard.validatePharmacistExists(args.walletAddress);
    if (pharmacistExists) {
      throw new HttpException(
        { message: 'pharmacist already exists' },
        HttpStatus.CONFLICT,
      );
    }

    if (
      await this.pharmacistGuard.validatePharmacistExistsInHospital(
        args.hospitalIds as number,
        args.walletAddress,
      )
    ) {
      throw new HttpException(
        { message: 'address already exists in this institution' },
        HttpStatus.CONFLICT,
      );
    }

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        args.hospitalIds as number,
      );

      if (!hospital) {
        throw new HttpException(
          { message: 'institution not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.pharmacistDao.createNewPharmacist(args);
      const pharmacist = await this.pharmacistDao.fetchPharmacistByAddress(
        args.walletAddress,
      );
      pharmacist.hospitalIds.push(args.hospitalIds);

      const pharmacistPreview = {
        id: pharmacist.id,
        walletAddress: pharmacist.walletAddress,
        hospitalIds: pharmacist.hospitalIds,
        profilePicture: pharmacist.profilePicture,
        name: pharmacist.name,
        status: pharmacist.status,
        category: Category.Pharmacist,
      } as PreviewType;

      try {
        hospital.pharmacists.push(pharmacistPreview);
        /**
         * @dev this was commented out to by-pass otp verification for demo sake. it should be reverted
         */
        // this.eventEmitter.emit(
        //   SharedEvents.ENTITY_CREATED,
        //   new EntityCreatedDto(
        //     args.walletAddress,
        //     pharmacist.email,
        //     'pharmacist',
        //   ),
        // );
      } catch (error) {
        await this.pharmacistDao.deletePharmacist(pharmacist.walletAddress);

        throw new HttpException(
          { message: 'an error occurred while joining institution' },
          HttpStatus.BAD_REQUEST,
        );
      }

      await pharmacist.save();
      await hospital.save();

      return {
        success: HttpStatus.OK,
        pharmacist,
        message: 'Pharmacist created successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while creating pharmacist',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPendingPharmacists() {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistWithPendingStatus();

      if (!pharmacist || pharmacist.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacist: [],
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacist,
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error fetching pharmacists');
    }
  }

  async getApprovedPharmacists() {
    try {
      const pharmacists =
        await this.pharmacistDao.fetchPharmacistsWithApprovedStatus();

      if (!pharmacists || pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error fetching pharmacists');
    }
  }

  async getPharmacistByAddress(address: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(address);

      if (!pharmacist) {
        return {
          success: ErrorCodes.NotFound,
          message: 'Pharmacist does not exist',
        };
      }

      const hospitalName = await this.hospitalDao
        .fetchHospitalWithBlockchainId(pharmacist.hospitalIds[0])
        .then((hospital) => hospital.name);

      const pharmacistData: PharmacistType = {
        _id: pharmacist._id,
        id: pharmacist.id,
        hospitalIds: pharmacist.hospitalIds,
        numberOfApprovals: pharmacist.numberOfApprovals,
        name: pharmacist.name,
        email: pharmacist.email,
        about: pharmacist.about,
        profilePicture: pharmacist.profilePicture,
        location: pharmacist.location,
        phoneNumber: pharmacist.phoneNumber,
        walletAddress: pharmacist.walletAddress,
        status: pharmacist.status,
        inventory: pharmacist.inventory,
        approvalList: pharmacist.approvalList,
        sharedPrescriptions: pharmacist.sharedPrescriptions,
        category: pharmacist.category,
        isVerified: pharmacist.isVerified,
      };

      const data = {
        hospitalName,
        ...pharmacistData,
      };

      return {
        success: ErrorCodes.Success,
        pharmacist: data,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new PharmacistError('Error fetching pharmacist');
    }
  }

  async getAllPharmacists() {
    try {
      const pharmacists = await this.pharmacistDao.fetchAllPharmacists();
      if (!pharmacists) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
        };
      }

      return {
        success: HttpStatus.OK,
        pharmacists,
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error fetching pharmacists');
    }
  }

  async updatePharmacist(walletAddress: string, args: UpdatePharmacistType) {
    try {
      const pharmacist = await this.pharmacistDao.updatePharmacist(
        walletAddress,
        args,
      );
      return {
        success: HttpStatus.OK,
        message: 'Pharmacist updated successfully',
        pharmacist,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'an error occurred while updating pharmacist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePharmacist(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      await this.hospitalDao.pullManyPharmacists(
        pharmacist.hospitalIds,
        walletAddress,
      );
      await this.pharmacistDao.deletePharmacist(walletAddress);
      return {
        success: HttpStatus.OK,
        message: 'pharmacist deleted successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while deleting pharmacist',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async fetchClassDescription(category: string) {
    const drugCategory = drugClassesDescription.find(
      (Category: DrugClassDescriptionInterface) =>
        Category.name.toLowerCase() === category.toLowerCase(),
    );

    if (!drugCategory) {
      await this.medicineService.addNewCategory(category);
      return 'none';
    }
    const description = drugCategory.description;
    console.log(description);

    return description;
  }

  private capitalizeFirstLetter(word: string) {
    if (!word) return word; // Handle empty string or null input
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  private async initMedication(args: MedicineType) {
    try {
      const medicine = await this.pharmacistDao.createMedicine(args);
      if (!medicine) {
        throw new HttpException(
          { message: 'an error occurred while creating medicine' },
          HttpStatus.BAD_REQUEST,
        );
      }

      return medicine;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while initializing medication',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async initInventory() {
    try {
      const inventory = await this.pharmacistDao.createInventory();
      if (!inventory)
        throw new HttpException(
          'an error occurred while creating inventory',
          HttpStatus.BAD_REQUEST,
        );

      return inventory;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while initializing inventory',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async handleNoInventoryCreated(
    walletAddress: string,
    category: string,
    args: MedicineType,
  ) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      pharmacist.inventory = await this.initInventory();
      await pharmacist.save();

      const medicine = await this.initMedication(args);
      const product = await this.pharmacistDao.createProduct({
        category: this.capitalizeFirstLetter(category),
        description: await this.fetchClassDescription(category),
        medications: [medicine],
      });

      if (!product) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'an error occurred while creating product',
        };
      }

      pharmacist.inventory.products.push(product);
      await pharmacist.save();

      pharmacist.inventory.numberOfCategories = 1;
      pharmacist.inventory.numberOfMedicine = 1;
      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        message: 'added medication to inventory successfully',
      };
    } catch (error) {
      console.error(error);
    }
  }

  private async handleInventoryUpdate(args: {
    pharmacistAddress: string;
    category: string;
    medicineName: string;
    quantity: number;
  }) {
    const { pharmacistAddress, category, medicineName, quantity } = args;
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
      const inventory = pharmacist.inventory;
      const productIndex = pharmacist.inventory.products.findIndex(
        (prod: ProductType) =>
          prod.category.toLowerCase() === category.toLowerCase(),
      );

      console.log(`inventory updated product ${productIndex}`);
      const medication = inventory.products[productIndex].medications.find(
        (_med) => _med.name.toLowerCase() === medicineName.toLowerCase(),
      );

      console.log(`inventory updated medication ${medication}`);

      medication.quantity -= quantity;
      inventory.numberOfMedicine -= quantity;
      inventory.numberOfMedicineSold += quantity;

      await pharmacist.save();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while updating inventory after dispense',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private handleMedicineAvailability(args: IHandleMedAvailability) {
    const { medicineName, availableMedications } = args;
    try {
      const availableMed = availableMedications
        .flat()
        .find(
          (med: MedicineType) =>
            med.name.toLowerCase() === medicineName.toLowerCase(),
        );

      if (!availableMed) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'no available medication found',
        };
      }

      return {
        status: HttpStatus.OK,
        message: 'medicine available',
        data: {
          price: availableMed.price,
          medQuantity: availableMed.quantity,
        },
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: 'an error occurred while handling medicine availability ' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async handlePatientPrescriptionUpdate(
    args: IHandlePatientPrescriptionUpdate,
  ) {
    const { patient, prescription, prescriptionReceipt, medicineId } = args;

    try {
      const patientPrescriptionData: Prescriptions = patient.prescriptions.find(
        (_prescription: Prescriptions) =>
          _prescription._id.toString().toLowerCase() ===
          prescription._id.toString().toLowerCase(),
      );

      if (!patientPrescriptionData) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'patient prescription not found',
        };
      }
      const medicationData = patientPrescriptionData.medicine.find(
        (med: Medication) =>
          med._id.toString().toLowerCase() ===
          medicineId.toString().toLowerCase(),
      );

      if (!medicationData) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'patient prescription medicine not found',
        };
      }

      medicationData.receipt = prescriptionReceipt;
      medicationData.isDispensed = true;
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        {
          message:
            'an error occurred while handling patient prescription update ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addMedicine(
    walletAddress: string,
    category: string,
    args: MedicineType,
  ) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      if (!pharmacist.inventory) {
        await this.handleNoInventoryCreated(walletAddress, category, args);
      } else {
        const productIndex = pharmacist.inventory.products.findIndex(
          (prod: ProductType) =>
            prod.category.toLowerCase() === category.toLowerCase(),
        );

        if (productIndex === -1) {
          const medicine = await this.initMedication(args);
          const newProduct = await this.pharmacistDao.createProduct({
            category: this.capitalizeFirstLetter(category),
            description: await this.fetchClassDescription(category),
            medications: [medicine],
          });
          pharmacist.inventory.products.push(newProduct);
        } else {
          const medication = pharmacist.inventory.products[
            productIndex
          ].medications.find(
            (_med) => _med.name.toLowerCase() === args.name.toLowerCase(),
          );

          if (medication) {
            medication.quantity += args.quantity;
            await pharmacist.save();
          } else {
            const medicine = await this.initMedication(args);
            pharmacist.inventory.products[productIndex].medications.push(
              medicine,
            );
          }
        }

        pharmacist.inventory.numberOfCategories =
          pharmacist.inventory.products.length;
        pharmacist.inventory.numberOfMedicine += args.quantity;
        await pharmacist.save();

        return {
          success: HttpStatus.OK,
          message: 'added medication to inventory successfully',
        };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while adding medication',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMedicine(args: DeleteMedicineInterface) {
    const { walletAddress, productId, medicineId } = args;
    try {
      const result = await this.pharmacistDao.pullMedicineById(
        walletAddress,
        productId,
        medicineId,
      );

      return {
        success: HttpStatus.OK,
        message: 'successfully deleted medication from inventory',
        result,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'an error occurred while deleting medication' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchMedicine(args: FetchMedicineInterface) {
    const { walletAddress, productId, medicineId } = args;

    try {
      const medicine = await this.pharmacistDao.findMedicineById(
        walletAddress,
        medicineId,
        productId,
      );
      if (!medicine) {
        throw new HttpException(
          { message: 'an error occurred while fetching medicine' },
          HttpStatus.BAD_REQUEST,
        );
      }

      return medicine;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'an error occurred while fetching medication' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllProducts(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      if (!pharmacist.inventory) {
        return {
          message: 'no products added',
          success: HttpStatus.NOT_FOUND,
        };
      }

      const products = pharmacist.inventory.products;
      return {
        success: HttpStatus.OK,
        message: 'successfully fetched all products',
        products,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'an error occurred while fetching all products' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchProduct(args: {
    walletAddress: string;
    productId: Types.ObjectId;
  }) {
    const { walletAddress, productId } = args;
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      const inventory = pharmacist.inventory;
      if (!inventory) {
        throw new HttpException(
          { message: 'no products added' },
          HttpStatus.NOT_FOUND,
        );
      }
      const product = await this.pharmacistDao.fetchProductById(
        productId,
        walletAddress,
      );
      if (!product) {
        throw new HttpException(
          { message: 'product not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: HttpStatus.OK,
        message: 'successfully fetched product',
        product,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while fetching product',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchInventory(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      const inventory = pharmacist.inventory;
      if (!inventory) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'no products found',
        };
      }

      return {
        success: HttpStatus.OK,
        inventory,
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error fetching inventory');
    }
  }

  async updateMedicine(
    args: FetchMedicineInterface,
    update: UpdateMedicineType,
  ) {
    const { walletAddress, productId, medicineId } = args;
    try {
      const data = await this.pharmacistDao.updateMedicine(
        walletAddress,
        medicineId,
        productId,
        update,
      );

      if (!data) {
        throw new HttpException(
          { message: 'an error occurred while updating medication' },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        success: HttpStatus.OK,
        message: 'successfully updated medication',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'an error occurred while updating medication' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkMedicineExist(args: DispenseHelper) {
    const { walletAddress, category, productPrescribed } = args;
    try {
      const inventory = await this.fetchInventory(walletAddress);
      const product = inventory.inventory.products.find(
        (prod: ProductType) => prod.category === category,
      );

      const medicine = product.medications.find(
        (med: MedicineType) =>
          med.name.toLowerCase() === productPrescribed.toLowerCase(),
      );

      let returnData: ReturnMedicationStatus;

      if (product && !medicine) {
        returnData = {
          medicineExist: false,
          categoryExist: true,
          availableMedications: product.medications,
        };
      } else if (product && medicine) {
        returnData = {
          medicineExist: true,
          categoryExist: true,
          availableMedications: [medicine],
        };
      } else {
        returnData = {
          medicineExist: false,
          categoryExist: false,
          availableMedications: [],
        };
      }

      return {
        success: HttpStatus.OK,
        data: returnData,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'an error occurred while checking medication' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllSharedPrescriptions(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      const prescriptions = pharmacist.sharedPrescriptions;
      if (!prescriptions) {
        throw new HttpException(
          { message: 'prescription not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: HttpStatus.OK,
        prescriptions,
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error fetching all shared prescriptions');
    }
  }

  async fetchPrescriptionById(args: {
    walletAddress: string;
    prescriptionId: Types.ObjectId;
  }) {
    const { walletAddress, prescriptionId } = args;
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      const prescription = pharmacist.sharedPrescriptions.find(
        (prescription) =>
          prescription._id.toString() === prescriptionId.toString(),
      );

      if (!prescription) {
        throw new HttpException(
          { message: 'prescription not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: HttpStatus.OK,
        prescription,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching prescription');
    }
  }

  async dispensePrescription(args: DispenseMedicineInterface) {
    const {
      patientAddress,
      pharmacistAddress,
      medicineId,
      productToDispense,
      directions,
      quantity,
    } = args;
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);

      const sharedPrescription = pharmacist.sharedPrescriptions;
      if (sharedPrescription.length < 1) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'no prescription found',
        };
      }

      const prescription = sharedPrescription.find(
        (prescription: Prescriptions) =>
          prescription.patientAddress === patientAddress,
      );

      if (!prescription) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'no prescription associated with patient found',
        };
      }

      const medicine = prescription.medicine.find(
        (med: Medication) =>
          med._id.toString().toLowerCase() ===
          medicineId.toString().toLowerCase(),
      );

      if (!medicine) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'invalid medicine id',
        };
      }

      const result = await this.checkMedicineExist({
        walletAddress: pharmacistAddress,
        category: medicine.productCategory,
        productPrescribed: medicine.productPrescribed,
      });

      const productNotAvailable =
        !result.data.categoryExist ||
        (!result.data.medicineExist &&
          result.data.availableMedications.length < 1);

      if (productNotAvailable) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'product not available',
        };
      }

      const {
        data: { price, medQuantity },
      } = this.handleMedicineAvailability({
        availableMedications: result.data.availableMedications,
        medicineName: productToDispense,
      });

      if (medQuantity < quantity || 0 || !medQuantity || !price) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'invalid quantity selected or out of stock',
        };
      }

      const prescriptionReceipt =
        await this.medicineService.createPrescriptionReceipt({
          productDispensed: productToDispense,
          directions,
          quantity: String(quantity),
          price: String(price * quantity),
        });

      if (!prescriptionReceipt.receipt) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'an error occurred while creating receipt',
        };
      }

      const patient =
        await this.patientDao.fetchPatientByAddress(patientAddress);
      await this.handlePatientPrescriptionUpdate({
        patient,
        prescription,
        prescriptionReceipt: prescriptionReceipt.receipt,
        medicineId,
      });

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
        success: HttpStatus.OK,
        message: 'dispense successful',
        data: {
          productName: productToDispense,
          quantity,
          price: String(price * quantity),
        },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          message: 'an error occurred while dispensing prescription',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePrescription(args: {
    walletAddress: string;
    prescriptionId: Types.ObjectId;
  }) {
    const { walletAddress, prescriptionId } = args;
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      const prescription = pharmacist.sharedPrescriptions.find(
        (p) => p._id.toString() === prescriptionId.toString(),
      );

      if (!prescription) {
        throw new HttpException(
          { message: 'prescription not found' },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.pharmacistDao.pullOnePrescription(
        walletAddress,
        prescriptionId,
      );

      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        message: 'Prescription removed successfully',
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error removing prescription');
    }
  }
}
