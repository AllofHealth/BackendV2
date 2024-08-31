import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MedicineDao } from '../dao/medicine.dao';

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
}
