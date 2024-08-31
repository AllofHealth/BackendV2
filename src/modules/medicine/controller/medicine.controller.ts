import { Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { MedicineService } from '../service/medicine.service';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}
  @Post('initializeCategories')
  async initCategory() {
    return await this.medicineService.createCategories();
  }

  @Post('addNewCategory')
  async addCategory(
    @Query('category', new ValidationPipe({ transform: true }))
    category: string,
  ) {
    return await this.addCategory(category);
  }

  @Get('fetchCategories')
  async fetchCategories() {
    return await this.medicineService.getCategories();
  }
}
