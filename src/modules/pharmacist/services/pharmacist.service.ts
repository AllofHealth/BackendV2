import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
import {
  CreatePharmacistType,
  DeleteMedicineInterface,
  FetchMedicineInterface,
  MedicineType,
  ProductType,
  UpdateMedicineType,
  UpdatePharmacistType,
} from '../interface/pharmacist.interface';
import { PharmacistGuard } from '../guards/pharmacist.guard';
import {
  ApprovalStatus,
  Category,
  ErrorCodes,
  PharmacistError,
} from '@/shared';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { MongooseError, Types } from 'mongoose';
import { MEDICINE_PLACEHOLDER } from '@/shared/constants';
import { PatientDao } from '@/modules/patient/dao/patient.dao';
import { OtpService } from '@/modules/otp/services/otp.service';
import {
  DrugClassDescriptionInterface,
  drugClassesDescription,
} from '@/modules/medicine/interface/medicine.interface';
import { MedicineService } from '@/modules/medicine/service/medicine.service';

@Injectable()
export class PharmacistService {
  constructor(
    private readonly pharmacistDao: PharmacistDao,
    private readonly pharmacistGuard: PharmacistGuard,
    private readonly hospitalDao: HospitalDao,
    private readonly patientDao: PatientDao,
    private readonly otpService: OtpService,
    private readonly medicineService: MedicineService,
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
        walletAddress: pharmacist.walletAddress,
        hospitalIds: pharmacist.hospitalIds,
        profilePicture: pharmacist.profilePicture,
        name: pharmacist.name,
        status: pharmacist.status,
        category: Category.Pharmacist,
      };

      try {
        hospital.pharmacists.push(pharmacistPreview);
        await this.otpService.deliverOtp(
          args.walletAddress,
          pharmacist.email,
          'pharmacist',
        );
      } catch (error) {
        await this.pharmacistDao.deletePharmacist(pharmacist.walletAddress);
        throw new PharmacistError('Error adding pharmacist to hospital');
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

      return {
        success: ErrorCodes.Success,
        pharmacist: pharmacist,
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
          error: error.message,
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

    return drugCategory.description;
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

      return inventory[0];
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

      const inventory = await this.initInventory();
      pharmacist.inventory = inventory;
      await pharmacist.save();

      const medicine = await this.initMedication(args);
      const product = await this.pharmacistDao.createProduct({
        category: this.capitalizeFirstLetter(category),
        description: await this.fetchClassDescription(category),
        medications: [medicine],
      });

      if (!product) {
        throw new HttpException(
          {
            message: 'an error occurred while adding medication to inventory',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      pharmacist.inventory.products.push(product);
      await pharmacist.save();
    } catch (error) {
      console.error(error);
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
        const medicine = await this.initMedication(args);
        const productIndex = pharmacist.inventory.products.findIndex(
          (prod: ProductType) =>
            prod.category.toLowerCase() === category.toLowerCase(),
        );

        if (productIndex === -1) {
          const newProduct = await this.pharmacistDao.createProduct({
            category: this.capitalizeFirstLetter(category),
            description: await this.fetchClassDescription(category),
            medications: [medicine],
          });
          pharmacist.inventory.products.push(newProduct);
        } else {
          pharmacist.inventory.products[productIndex].medications.push(
            medicine,
          );
        }
      }

      pharmacist.inventory.numberOfCategories =
        pharmacist.inventory.products.length;
      pharmacist.inventory.numberOfMedicine++;
      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        message: 'added medication to inventory successfully',
      };
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

  /**
   * @todo: use new impl guard for authorization and validation
   */
  async fetchAllMedicine(walletAddress: string) {
    // try {
    //   const pharmacist =
    //     await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
    //   if (!pharmacist) {
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       message: 'pharmacist not found',
    //     };
    //   }
    //   const inventory = pharmacist.inventory;
    //   if (!inventory) {
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       message: 'inventory not found',
    //     };
    //   }
    //   const medicines = inventory.medicines;
    //   if (medicines.length === 0) {
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       medicines: [],
    //     };
    //   }
    //   return {
    //     success: HttpStatus.OK,
    //     medicines,
    //   };
    // } catch (error) {
    //   console.error(error);
    //   throw new PharmacistError('Error fetching all medicine');
    // }
  }

  async fetchInventory(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      const inventory = pharmacist.inventory;
      if (!inventory) {
        return {
          success: HttpStatus.NOT_FOUND,
          inventory: {},
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

  /**
   * @todo: use new impl guard for authorization and validation
   */
  async updateMedicine(
    args: FetchMedicineInterface,
    update: UpdateMedicineType,
  ) {}

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

  /**
   * @todo: refactor this function to use the prescription service
   * @dev The prescription changed, so this function needs to be refactored
   */
  async dispensePrescription(args: {
    walletAddress: string;
    prescriptionId: Types.ObjectId;
  }) {
    // const { walletAddress, prescriptionId } = args;
    // try {
    //   const pharmacist =
    //     await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
    //   if (!pharmacist) {
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       message: 'pharmacist not found',
    //     };
    //   }
    //   const prescription = pharmacist.sharedPrescriptions.find(
    //     (p) => p._id.toString() === prescriptionId.toString(),
    //   );
    //   if (!prescription) {
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       message: 'prescription not found',
    //     };
    //   }
    //   const patient = await this.patientDao.fetchPatientByAddress(
    //     prescription.patientAddress,
    //   );
    //   if (!patient) {
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       message: 'patient not found',
    //     };
    //   }
    //   const inventory = pharmacist.inventory;
    //   const medicine = inventory.medicines.find(
    //     (m) => m.name === prescription.medicineName,
    //   );
    //   if (!medicine) {
    //     await this.pharmacistDao.pullOnePrescription(
    //       walletAddress,
    //       prescriptionId,
    //     );
    //     await pharmacist.save();
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       message: 'medicine not found in inventory, removing prescription',
    //     };
    //   }
    //   const patientPrescription = patient.prescriptions.find(
    //     (p) => p._id.toString() === prescriptionId.toString(),
    //   );
    //   if (!patientPrescription) {
    //     return {
    //       success: HttpStatus.NOT_FOUND,
    //       message: 'prescription not found in patient prescriptions',
    //     };
    //   }
    //   const prescriptionQuantity = prescription.quantity
    //     ? prescription.quantity
    //     : 1;
    //   if (medicine.quantity < prescriptionQuantity) {
    //     return {
    //       success: HttpStatus.BAD_REQUEST,
    //       message:
    //         'quantity of medicine in inventory is less than prescribed quantity',
    //     };
    //   }
    //   medicine.quantity -= prescriptionQuantity;
    //   inventory.numberOfMedicine -= prescriptionQuantity;
    //   patientPrescription.status = 'dispensed';
    //   patientPrescription.dispensedDate = new Date();
    //   patientPrescription.dispensedBy = walletAddress;
    //   await patient.save();
    //   await this.pharmacistDao.pullOnePrescription(
    //     walletAddress,
    //     prescriptionId,
    //   );
    //   await pharmacist.save();
    //   return {
    //     success: HttpStatus.OK,
    //     message: 'Prescription dispensed successfully',
    //   };
    // } catch (error) {
    //   console.error(error);
    //   throw new PharmacistError('Error dispensing prescription');
    // }
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
