import { HttpStatus, Injectable } from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
import {
  CreatePharmacistType,
  UpdatePharmacistType,
} from '../interface/pharmacist.interface';
import { PharmacistGuard } from '../guards/pharmacist.guard';
import { ErrorCodes, PharmacistError } from 'src/shared';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { MongooseError } from 'mongoose';

@Injectable()
export class PharmacistService {
  constructor(
    private readonly pharmacistDao: PharmacistDao,
    private readonly pharmacistGuard: PharmacistGuard,
    private readonly hospitalDao: HospitalDao,
  ) {}

  async createPharmacist(args: CreatePharmacistType) {
    const requiredParams = [
      'id',
      'hospitalIds',
      'name',
      'email',
      'location',
      'phoneNumber',
      'walletAddress',
    ];

    if (
      !requiredParams.every(
        (param) => args[param as keyof CreatePharmacistType],
      )
    ) {
      throw new Error('Missing required parameter');
    }

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
    return await this.pharmacistDao.fetchAllPharmacists();
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
}
