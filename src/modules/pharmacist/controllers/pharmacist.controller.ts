import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PharmacistService } from '../services/pharmacist.service';
import {
  AddMedicineDto,
  CreatePharmacistDto,
  DispenseMedicationDto,
  UpdateMedicineDto,
  UpdatePharmacistDto,
} from '../dto/pharmacist.dto';
import { Types } from 'mongoose';
import {
  PharmacistAuthGuard,
  PharmacistExist,
  PharmacistVerificationGuard,
} from '../guards/pharmacist.auth.guard';

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
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
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
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async addMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true })) medicine: AddMedicineDto,
  ) {
    return await this.pharmacistService.addMedicine(
      walletAddress,
      medicine.category,
      medicine,
    );
  }

  @Post('removeMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async removeMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('productId', new ValidationPipe({ transform: true }))
    productId: Types.ObjectId,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
  ) {
    return await this.pharmacistService.deleteMedicine({
      walletAddress,
      productId,
      medicineId,
    });
  }

  @Post('updateMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async updateMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
    @Query('productId', new ValidationPipe({ transform: true }))
    productId: Types.ObjectId,
    @Body() data: UpdateMedicineDto,
  ) {
    return await this.pharmacistService.updateMedicine(
      {
        walletAddress,
        productId,
        medicineId,
      },
      data,
    );
  }

  @Post('dispensePrescription')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async dispensePrescription(
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('pharmacistAddress', new ValidationPipe({ transform: true }))
    pharmacistAddress: string,
    @Body() dispenseDto: DispenseMedicationDto,
  ) {
    return await this.pharmacistService.dispensePrescription({
      patientAddress,
      pharmacistAddress,
      productToDispense: dispenseDto.productToDispense,
      directions: dispenseDto.directions,
      quantity: dispenseDto.quantity,
      medicineId: new Types.ObjectId(dispenseDto.medicineId),
    });
  }

  @Post('removePrescription')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async removePrescription(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    return await this.pharmacistService.removePrescription({
      walletAddress,
      prescriptionId,
    });
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
  @UseGuards(PharmacistExist)
  async deletePharmacistByAddress(
    @Query('walletAddress') walletAddress: string,
  ) {
    return await this.pharmacistService.deletePharmacist(walletAddress);
  }

  @Get('getMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getMedicine(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('productId', new ValidationPipe({ transform: true }))
    productId: Types.ObjectId,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
  ) {
    return await this.pharmacistService.fetchMedicine({
      walletAddress,
      productId,
      medicineId,
    });
  }

  @Get('getProduct')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async fetchProduct(
    @Query('walletAddress') walletAddress: string,
    @Query('productId') productId: Types.ObjectId,
  ) {
    return await this.pharmacistService.fetchProduct({
      walletAddress,
      productId,
    });
  }

  @Get('getAllProducts')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getAllProducts(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.pharmacistService.fetchAllProducts(walletAddress);
  }

  @Get('getInventory')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getInventory(
    @Query('walletAddress', new ValidationPipe()) walletAddress: string,
  ) {
    return await this.pharmacistService.fetchInventory(walletAddress);
  }

  @Get('getAllSharedPrescriptions')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getAllSharedPrescriptions(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.pharmacistService.fetchAllSharedPrescriptions(
      walletAddress,
    );
  }

  @Get('getSharedPrescription')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
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

  @Get('checkProductAvailability')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async checkProductExist(
    @Query('walletAddress') walletAddress: string,
    @Query('category') category: string,
    @Query('medication') productPrescribed: string,
  ) {
    return await this.pharmacistService.checkMedicineExist({
      walletAddress,
      category,
      productPrescribed,
    });
  }
}
