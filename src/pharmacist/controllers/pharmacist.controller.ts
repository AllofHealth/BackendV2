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
  UpdateMedicineDto,
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

  @Post('updateMedicine')
  async updateMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
    @Body() medicine: UpdateMedicineDto,
  ) {
    return await this.pharmacistService.updateMedicine(
      walletAddress,
      medicineId,
      medicine,
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

  @Get('getMedicine')
  async getMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
  ) {
    return await this.pharmacistService.fetchMedicine(
      walletAddress,
      medicineId,
    );
  }

  @Get('getAllMedicines')
  async getAllMedicines(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.pharmacistService.fetchAllMedicine(walletAddress);
  }

  @Get('getInventory')
  async getInventory(
    @Query('walletAddress', new ValidationPipe()) walletAddress: string,
  ) {
    return await this.pharmacistService.fetchInventory(walletAddress);
  }

  @Get('getAllSharedPrescriptions')
  async getAllSharedPrescriptions(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.pharmacistService.fetchAllSharedPrescriptions(
      walletAddress,
    );
  }

  @Get('getSharedPrescription')
  async getSharedPrescription(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    return await this.pharmacistService.fetchPrescriptionById({
      walletAddress,
      prescriptionId,
    });
  }
}
