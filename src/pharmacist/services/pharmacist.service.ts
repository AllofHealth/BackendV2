import { HttpStatus, Injectable } from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
import {
  CreatePharmacistType,
  MedicineType,
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
import { MongooseError } from 'mongoose';
import { MEDICINE_PLACEHOLDER } from 'src/shared/constants';

@Injectable()
export class PharmacistService {
  constructor(
    private readonly pharmacistDao: PharmacistDao,
    private readonly pharmacistGuard: PharmacistGuard,
    private readonly hospitalDao: HospitalDao,
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
      const medicine = await this.pharmacistDao.createMedicine({
        name,
        price,
        quantity,
        description,
        sideEffects: sideEffects ? sideEffects : 'No side effects',
        image: image ? image : MEDICINE_PLACEHOLDER,
        medicineGroup,
      });
      if (!inventory) {
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

      inventory.numberOfMedicine += quantity;
      const medicineGroupExists = inventory.medicines.some(
        (medicine) => medicine.medicineGroup === medicineGroup,
      );

      if (medicineGroupExists) {
        const medicineGroupIndex = inventory.medicines.findIndex(
          (medicine) => medicine.medicineGroup === medicineGroup,
        );
        inventory.medicines[medicineGroupIndex].quantity += quantity;
      } else {
        inventory.numberOfMedicineGroup += 1;
        inventory.medicines.push(medicine);
      }

      await pharmacist.save();

      return {
        success: HttpStatus.OK,
        message: 'Medicine added successfully',
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error adding medicine');
    }
  }
}
