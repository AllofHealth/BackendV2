import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PharmacistService } from '../services/pharmacist.service';
import {
  AddMedicineDto,
  CreatePharmacistDto,
  UpdatePharmacistDto,
} from '../dto/pharmacist.dto';
import { Types } from 'mongoose';

@Controller('pharmacist')
export class PharmacistController {
  constructor(private readonly pharmacistService: PharmacistService) {}

  @Post('createPharmacist')
  async createPharmacist(
    @Body(ValidationPipe) createPharmacistDto: CreatePharmacistDto,
  ) {
    return await this.pharmacistService.createPharmacist(createPharmacistDto);
  }

  @Post('updatePharmacist')
  async updatePharmacist(
    @Query('walletAddress') walletAddress: string,
    @Body() updatePharmacistDto: UpdatePharmacistDto,
  ) {
    return await this.pharmacistService.updatePharmacist(
      walletAddress,
      updatePharmacistDto,
    );
  }

  @Post('addMedicine')
  async addMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true })) medicine: AddMedicineDto,
  ) {
    return await this.pharmacistService.addMedicine(walletAddress, medicine);
  }

  @Post('removeMedicine')
  async removeMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
  ) {
    return await this.pharmacistService.deleteMedicine(
      walletAddress,
      medicineId,
    );
  }

  @Get('getPharmacist')
  async getPharmacist(@Query('walletAddress') walletAddress: string) {
    return await this.pharmacistService.getPharmacistByAddress(walletAddress);
  }

  @Get('approvedPharmacists')
  async getApprovedPharmacists() {
    return await this.pharmacistService.getApprovedPharmacists();
  }

  @Get('pendingPharmacists')
  async getPendingPharmacists() {
    return await this.pharmacistService.getPendingPharmacists();
  }

  @Get('getAllPharmacists')
  async getAllPharmacists() {
    return await this.pharmacistService.getAllPharmacists();
  }

  @Delete('deletePharmacist')
  async deletePharmacistByAddress(
    @Query('walletAddress') walletAddress: string,
  ) {
    return await this.pharmacistService.deletePharmacist(walletAddress);
  }
}
