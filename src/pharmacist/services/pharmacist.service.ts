import { HttpStatus, Injectable } from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
import {
  CreatePharmacistType,
  MedicineType,
  UpdateMedicineType,
  UpdatePharmacistType,
} from '../interface/pharmacist.interface';
import { PharmacistGuard } from '../guards/pharmacist.guard';
import {
  ApprovalStatus,
  Category,
  ErrorCodes,
  PharmacistError,
} from 'src/shared';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { MongooseError, Types } from 'mongoose';
import { MEDICINE_PLACEHOLDER } from 'src/shared/constants';
import { PatientDao } from 'src/patient/dao/patient.dao';

@Injectable()
export class PharmacistService {
  constructor(
    private readonly pharmacistDao: PharmacistDao,
    private readonly pharmacistGuard: PharmacistGuard,
    private readonly hospitalDao: HospitalDao,
    private readonly patientDao: PatientDao,
  ) {}

  async createPharmacist(args: CreatePharmacistType) {
    const pharmacistExists =
      await this.pharmacistGuard.validatePharmacistExists(args.walletAddress);
    if (pharmacistExists) {
      return {
        success: ErrorCodes.Error,
        message: 'Pharmacist already exists',
      };
    }

    if (
      await this.pharmacistGuard.validatePharmacistExistsInHospital(
        args.hospitalIds as number,
        args.walletAddress,
      )
    ) {
      throw new PharmacistError('Pharmacist already exists in hospital');
    }

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        args.hospitalIds as number,
      );

      if (!hospital) {
        throw new PharmacistError("Hospital doesn't exist");
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
      } catch (error) {
        await this.pharmacistDao.deletePharmacist(pharmacist.walletAddress);
        throw new PharmacistError('Error adding pharmacist to hospital');
      }

      await pharmacist.save();
      await hospital.save();

      return {
        success: ErrorCodes.Success,
        pharmacist,
        message: 'Pharmacist created successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new PharmacistError('An error ocurred while creating pharmacist');
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
      const pharmacistExist =
        await this.pharmacistGuard.validatePharmacistExists(walletAddress);
      if (!pharmacistExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Pharmacist does not exist',
        };
      }

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
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new PharmacistError('Error updating pharmacist');
    }
  }

  async deletePharmacist(walletAddress: string) {
    try {
      const pharmacistExist =
        await this.pharmacistGuard.validatePharmacistExists(walletAddress);
      if (!pharmacistExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      const hospitalIds = pharmacist.hospitalIds;
      await this.hospitalDao.pullManyPharmacists(hospitalIds, walletAddress);
      await this.pharmacistDao.deletePharmacist(walletAddress);
      return {
        success: HttpStatus.OK,
        message: 'pharmacist deleted successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new PharmacistError('Error deleting pharmacist');
    }
  }

  async addMedicine(walletAddress: string, args: MedicineType) {
    const {
      name,
      price,
      quantity,
      description,
      sideEffects,
      image,
      medicineGroup,
    } = args;
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Pharmacist does not exist',
        };
      }

      if (pharmacist.status !== ApprovalStatus.Approved) {
        return {
          success: HttpStatus.FORBIDDEN,
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
          image: image ? image : MEDICINE_PLACEHOLDER,
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
          success: HttpStatus.OK,
          message: 'Medicine added successfully',
        };
      }

      const existingMedicine = inventory.medicines.find(
        (medicine) =>
          medicine.name === name && medicine.medicineGroup === medicineGroup,
      );

      if (existingMedicine) {
        existingMedicine.price = price;
        existingMedicine.description = description;
        existingMedicine.sideEffects = sideEffects
          ? sideEffects
          : 'No side effects';
        existingMedicine.quantity += quantity;
        inventory.numberOfMedicine += quantity;
      } else {
        const medicine = await this.pharmacistDao.createMedicine({
          name,
          price,
          quantity,
          description,
          sideEffects: sideEffects ? sideEffects : 'No side effects',
          image: image ? image : MEDICINE_PLACEHOLDER,
          medicineGroup,
        });
        inventory.numberOfMedicineGroup += 1;
        inventory.numberOfMedicine += quantity;
        inventory.medicines.push(medicine);
      }

      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        message: 'Medicine added successfully',
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error adding medicine');
    }
  }

  async deleteMedicine(walletAddress: string, medicineId: Types.ObjectId) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const inventory = pharmacist.inventory;
      if (!inventory) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'inventory not found',
        };
      }

      const medicine = await this.pharmacistDao.findMedicineById(medicineId);
      if (!medicine) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'medicine not found',
        };
      }

      const medicineExistInInventory = inventory.medicines.find(
        (medicine: MedicineType) =>
          medicine._id.toString() === medicineId.toString(),
      );
      if (!medicineExistInInventory) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'medicine not found in inventory',
        };
      }

      inventory.numberOfMedicine -= medicine.quantity;

      await this.pharmacistDao.pullMedicineById(walletAddress, medicineId);
      await this.pharmacistDao.deleteMedicineById(medicineId);

      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        message: 'Medicine deleted successfully',
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error deleting medicine');
    }
  }

  async fetchMedicine(walletAddress: string, medicineId: Types.ObjectId) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const inventory = pharmacist.inventory;
      if (!inventory) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'inventory not found',
        };
      }

      const medicine = await this.pharmacistDao.findMedicineById(medicineId);
      if (!medicine) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'medicine not found',
        };
      }

      const medicineExistInInventory = inventory.medicines.find(
        (medicine: MedicineType) =>
          medicine._id.toString() === medicineId.toString(),
      );
      if (!medicineExistInInventory) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'medicine not found in inventory',
        };
      }

      return {
        success: HttpStatus.OK,
        medicine,
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error fetching medicine');
    }
  }

  async fetchAllMedicine(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const inventory = pharmacist.inventory;
      if (!inventory) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'inventory not found',
        };
      }

      const medicines = inventory.medicines;
      if (medicines.length === 0) {
        return {
          success: HttpStatus.NOT_FOUND,
          medicines: [],
        };
      }

      return {
        success: HttpStatus.OK,
        medicines,
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error fetching all medicine');
    }
  }

  async fetchInventory(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

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

  async updateMedicine(
    walletAddress: string,
    medicineId: Types.ObjectId,
    args: UpdateMedicineType,
  ) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const inventory = pharmacist.inventory;
      if (!inventory) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'inventory not found',
        };
      }
      const medicine = inventory.medicines.find(
        (medicine: MedicineType) =>
          medicine._id.toString() === medicineId.toString(),
      );
      if (!medicine) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'medicine not found',
        };
      }
      const updateMedicine = await this.pharmacistDao.updateMedicine(
        walletAddress,
        medicineId,
        args,
      );
      await pharmacist.save();

      const totalNumberOfMedicine = inventory.medicines.reduce(
        (total, medicine) => total + medicine.quantity,
        0,
      );

      inventory.numberOfMedicine = totalNumberOfMedicine;
      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        updateMedicine,
      };
    } catch (error) {
      console.error('Error updating medicine');
    }
  }

  async fetchAllSharedPrescriptions(walletAddress: string) {
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const prescriptions = pharmacist.sharedPrescriptions;
      if (!prescriptions) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'prescriptions not found',
        };
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
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const prescription = pharmacist.sharedPrescriptions.find(
        (prescription) =>
          prescription._id.toString() === prescriptionId.toString(),
      );

      if (!prescription) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'prescription not found',
        };
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

  async dispensePrescription(args: {
    walletAddress: string;
    prescriptionId: Types.ObjectId;
  }) {
    const { walletAddress, prescriptionId } = args;
    try {
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const prescription = pharmacist.sharedPrescriptions.find(
        (p) => p._id.toString() === prescriptionId.toString(),
      );
      if (!prescription) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'prescription not found',
        };
      }

      const patient = await this.patientDao.fetchPatientByAddress(
        prescription.patientAddress,
      );
      if (!patient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'patient not found',
        };
      }

      const inventory = pharmacist.inventory;
      const medicine = inventory.medicines.find(
        (m) => m.name === prescription.medicineName,
      );
      if (!medicine) {
        await this.pharmacistDao.pullOnePrescription(
          walletAddress,
          prescriptionId,
        );
        await pharmacist.save();
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'medicine not found in inventory, removing prescription',
        };
      }

      const patientPrescription = patient.prescriptions.find(
        (p) => p._id.toString() === prescriptionId.toString(),
      );
      if (!patientPrescription) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'prescription not found in patient prescriptions',
        };
      }

      const prescriptionQuantity = prescription.quantity
        ? prescription.quantity
        : 1;

      if (medicine.quantity < prescriptionQuantity) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message:
            'quantity of medicine in inventory is less than prescribed quantity',
        };
      }

      medicine.quantity -= prescriptionQuantity;
      inventory.numberOfMedicine -= prescriptionQuantity;
      patientPrescription.status = 'dispensed';
      patientPrescription.dispensedDate = new Date();
      patientPrescription.dispensedBy = walletAddress;
      await patient.save();

      await this.pharmacistDao.pullOnePrescription(
        walletAddress,
        prescriptionId,
      );
      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        message: 'Prescription dispensed successfully',
      };
    } catch (error) {
      console.error(error);
      throw new PharmacistError('Error dispensing prescription');
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
      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      const prescription = pharmacist.sharedPrescriptions.find(
        (p) => p._id.toString() === prescriptionId.toString(),
      );

      if (!prescription) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'prescription not found',
        };
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
