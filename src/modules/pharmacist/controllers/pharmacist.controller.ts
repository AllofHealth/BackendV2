import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
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
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';

@Controller('pharmacist')
export class PharmacistController {
  private readonly logger = new MyLoggerService(PharmacistController.name);

  constructor(private readonly pharmacistService: PharmacistService) {}

  @Post('createPharmacist')
  async createPharmacist(
    @Ip() ip: string,
    @Body(ValidationPipe) createPharmacistDto: CreatePharmacistDto,
  ) {
    this.logger.log(`Create Pharmacist Request\t${ip}`);
    return await this.pharmacistService.createPharmacist(createPharmacistDto);
  }

  @Post('updatePharmacist')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async updatePharmacist(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
    @Body() updatePharmacistDto: UpdatePharmacistDto,
  ) {
    this.logger.log(`Update Pharmacist Request\t${ip}`);
    return await this.pharmacistService.updatePharmacist(
      walletAddress,
      updatePharmacistDto,
    );
  }

  @Post('addMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async addMedicine(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true })) medicine: AddMedicineDto,
  ) {
    this.logger.log(`Add Medicine Request\t${ip}`);
    return await this.pharmacistService.addMedicine(
      walletAddress,
      medicine.category,
      medicine,
    );
  }

  @Post('removeMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async removeMedicine(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('productId', new ValidationPipe({ transform: true }))
    productId: Types.ObjectId,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
  ) {
    this.logger.log(`Remove Medicine Request\t${ip}`);
    return await this.pharmacistService.deleteMedicine({
      walletAddress,
      productId,
      medicineId,
    });
  }

  @Post('updateMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async updateMedicine(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
    @Query('productId', new ValidationPipe({ transform: true }))
    productId: Types.ObjectId,
    @Body() data: UpdateMedicineDto,
  ) {
    this.logger.log(`Update Medicine Request\t${ip}`);
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
    @Ip() ip: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('pharmacistAddress', new ValidationPipe({ transform: true }))
    pharmacistAddress: string,
    @Body() dispenseDto: DispenseMedicationDto,
  ) {
    this.logger.log(`Dispense Prescription Request\t${ip}`);
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
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    this.logger.log(`Remove Prescription Request\t${ip}`);
    return await this.pharmacistService.removePrescription({
      walletAddress,
      prescriptionId,
    });
  }

  @Get('getPharmacist')
  async getPharmacist(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
  ) {
    this.logger.log(`Get Pharmacist Request\t${ip}`);
    return await this.pharmacistService.getPharmacistByAddress(walletAddress);
  }

  @Get('approvedPharmacists')
  async getApprovedPharmacists(@Ip() ip: string) {
    this.logger.log(`Get Approved Pharmacist Request\t${ip}`);
    return await this.pharmacistService.getApprovedPharmacists();
  }

  @Get('pendingPharmacists')
  async getPendingPharmacists(@Ip() ip: string) {
    this.logger.log(`Get Pending Pharmacist Request\t${ip}`);
    return await this.pharmacistService.getPendingPharmacists();
  }

  @Get('getAllPharmacists')
  async getAllPharmacists(@Ip() ip: string) {
    this.logger.log(`Create New Patient Request\t${ip}`);
    return await this.pharmacistService.getAllPharmacists();
  }

  @Delete('deletePharmacist')
  @UseGuards(PharmacistExist)
  async deletePharmacistByAddress(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
  ) {
    this.logger.log(`Delete Pharmacist Request\t${ip}`);
    return await this.pharmacistService.deletePharmacist(walletAddress);
  }

  @Get('getMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getMedicine(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('productId', new ValidationPipe({ transform: true }))
    productId: Types.ObjectId,
    @Query('medicineId', new ValidationPipe({ transform: true }))
    medicineId: Types.ObjectId,
  ) {
    this.logger.log(`Get Medicine Request\t${ip}`);
    return await this.pharmacistService.fetchMedicine({
      walletAddress,
      productId,
      medicineId,
    });
  }

  @Get('getProduct')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async fetchProduct(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
    @Query('productId') productId: Types.ObjectId,
  ) {
    this.logger.log(`Fetch Product Request\t${ip}`);
    return await this.pharmacistService.fetchProduct({
      walletAddress,
      productId,
    });
  }

  @Get('getAllProducts')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getAllProducts(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Get All Products Request\t${ip}`);
    return await this.pharmacistService.fetchAllProducts(walletAddress);
  }

  @Get('getInventory')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getInventory(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe()) walletAddress: string,
  ) {
    this.logger.log(`Get Inventory Request\t${ip}`);
    return await this.pharmacistService.fetchInventory(walletAddress);
  }

  @Get('getAllSharedPrescriptions')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getAllSharedPrescriptions(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Get All Shared Prescription Request\t${ip}`);
    return await this.pharmacistService.fetchAllSharedPrescriptions(
      walletAddress,
    );
  }

  @Get('getSharedPrescription')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async getSharedPrescription(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    this.logger.log(`Get Shared Prescription Request\t${ip}`);
    return await this.pharmacistService.fetchPrescriptionById({
      walletAddress,
      prescriptionId,
    });
  }

  @Get('checkProductAvailability')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  async checkProductExist(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
    @Query('category') category: string,
    @Query('medication') productPrescribed: string,
  ) {
    this.logger.log(`Create Product Availabilty Request\t${ip}`);
    return await this.pharmacistService.checkMedicineExist({
      walletAddress,
      category,
      productPrescribed,
    });
  }
}
