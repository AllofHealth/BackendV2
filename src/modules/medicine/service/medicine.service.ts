import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MedicineDao } from '../dao/medicine.dao';
import { CreateReceiptInterface } from '../interface/medicine.interface';
import { Types } from 'mongoose';

@Injectable()
export class MedicineService {
  constructor(private readonly medicineDao: MedicineDao) {}

  async getCategories() {
    try {
      const categories = await this.medicineDao.getAllCategories();
      if (!categories) {
        return {
          success: HttpStatus.NOT_FOUND,
          categories: [],
        };
      }

      return categories[0].category;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'cannot fetch categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCategories() {
    try {
      const categories = await this.medicineDao.createCategories();

      if (!categories) {
        throw new HttpException(
          'error creating categories',
          HttpStatus.CONFLICT,
        );
      }

      return {
        status: HttpStatus.OK,
        categories,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'cannot create categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPrescriptionReceipt(args: CreateReceiptInterface) {
    try {
      const receipt = await this.medicineDao.createReceipt(args);
      if (!receipt) {
        throw new HttpException('error creating receipt', HttpStatus.CONFLICT);
      }

      return {
        status: HttpStatus.OK,
        receipt,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'cannot create receipt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addNewCategory(args: string) {
    try {
      const categories = await this.medicineDao.getAllCategories();
      if (!categories) {
        return {
          success: HttpStatus.NOT_FOUND,
          categories: [],
        };
      }
      categories[0].category.push(args);
      await categories[0].save();

      return {
        success: HttpStatus.OK,
        categories: categories[0].category,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'cannot fetch categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePrescriptionReceipt(id: Types.ObjectId) {
    try {
      return this.medicineDao.deleteReceipt(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'an error occurred while deleting receipt' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
