import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  InventoryDto,
  PharmacistDto,
  ProductExistDto,
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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MedicineDto, ProductDto } from '@/modules/medicine/dto/medicine.dto';
import { PrescriptionDto, ReceiptDto } from '@/modules/patient/dto/patient.dto';

@ApiTags('pharmacist')
@Controller('pharmacist')
export class PharmacistController {
  private readonly logger = new MyLoggerService(PharmacistController.name);

  constructor(private readonly pharmacistService: PharmacistService) {}

  @Post('createPharmacist')
  @ApiOperation({ summary: 'Create Pharmacist' })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Pharmacist created successfully',
    type: PharmacistDto,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async createPharmacist(
    @Ip() ip: string,
    @Body(ValidationPipe) createPharmacistDto: CreatePharmacistDto,
  ) {
    this.logger.log(`Create Pharmacist Request\t${ip}`);
    return await this.pharmacistService.createPharmacist(createPharmacistDto);
  }

  @Post('updatePharmacist')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  @ApiOperation({ summary: 'Update Pharmacist' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Pharmacist updated successfully',
    type: PharmacistDto,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Add Medicine' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Remove Medicine' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
  })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'Wallet Address',
  })
  @ApiQuery({
    name: 'productId',
    required: true,
    type: String,
    description: 'Product Id',
  })
  @ApiQuery({
    name: 'medicineId',
    required: true,
    type: String,
    description: 'Medicine Id',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Update Medicine' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiQuery({
    name: 'productId',
    required: true,
    type: String,
    description: 'Product Id',
  })
  @ApiQuery({
    name: 'medicineId',
    required: true,
    type: String,
    description: 'Medicine Id',
  })
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
  @ApiOperation({ summary: 'dispense Prescription' })
  @ApiQuery({
    name: 'patientAddress',
    required: true,
    type: String,
    description: 'Patient Address',
  })
  @ApiQuery({
    name: 'pharmacistAddress',
    required: true,
    type: String,
    description: 'Pharmacist Address',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: ReceiptDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async dispensePrescription(
    @Ip() ip: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body() dispenseDto: DispenseMedicationDto,
  ) {
    this.logger.log(`Dispense Prescription Request\t${ip}`);
    return await this.pharmacistService.dispensePrescription({
      patientAddress,
      pharmacistAddress: walletAddress,
      productToDispense: dispenseDto.productToDispense,
      directions: dispenseDto.directions,
      quantity: dispenseDto.quantity,
      medicineId: new Types.ObjectId(dispenseDto.medicineId),
    });
  }

  @Post('removePrescription')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  @ApiOperation({ summary: 'Remove Prescription' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiQuery({
    name: 'prescriptionId',
    required: true,
    type: String,
    description: 'prescription id',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Get Pharmacist' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: PharmacistDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async getPharmacist(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
  ) {
    this.logger.log(`Get Pharmacist Request\t${ip}`);
    return await this.pharmacistService.getPharmacistByAddress(walletAddress);
  }

  @Get('approvedPharmacists')
  @ApiOperation({ summary: 'Get Approved Pharmacists' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: PharmacistDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async getApprovedPharmacists(@Ip() ip: string) {
    this.logger.log(`Get Approved Pharmacist Request\t${ip}`);
    return await this.pharmacistService.getApprovedPharmacists();
  }

  @Get('pendingPharmacists')
  @ApiOperation({ summary: 'Get Pending Pharmacists' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: PharmacistDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async getPendingPharmacists(@Ip() ip: string) {
    this.logger.log(`Get Pending Pharmacist Request\t${ip}`);
    return await this.pharmacistService.getPendingPharmacists();
  }

  @Get('getAllPharmacists')
  @ApiOperation({ summary: 'Get All Pharmacists' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: PharmacistDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async getAllPharmacists(@Ip() ip: string) {
    this.logger.log(`Create New Patient Request\t${ip}`);
    return await this.pharmacistService.getAllPharmacists();
  }

  @Delete('deletePharmacist')
  @UseGuards(PharmacistExist)
  @ApiOperation({ summary: 'Delete Pharmacist' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async deletePharmacistByAddress(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
  ) {
    this.logger.log(`Delete Pharmacist Request\t${ip}`);
    return await this.pharmacistService.deletePharmacist(walletAddress);
  }

  @Get('getMedicine')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  @ApiOperation({ summary: 'Get Medicine' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiQuery({
    name: 'productId',
    required: true,
    type: String,
    description: 'Product Id',
  })
  @ApiQuery({
    name: 'medicineId',
    required: true,
    type: String,
    description: 'Medicine Id',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: MedicineDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Get Product' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiQuery({
    name: 'productId',
    required: true,
    type: String,
    description: 'Product Id',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: ProductDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Get All Products' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: ProductDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Get Inventory' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: InventoryDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async getInventory(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe()) walletAddress: string,
  ) {
    this.logger.log(`Get Inventory Request\t${ip}`);
    return await this.pharmacistService.fetchInventory(walletAddress);
  }

  @Get('getAllSharedPrescriptions')
  @UseGuards(PharmacistAuthGuard, PharmacistVerificationGuard)
  @ApiOperation({ summary: 'Get All Shared Prescriptions' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: PrescriptionDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Get Shared Prescription' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: PrescriptionDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
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
  @ApiOperation({ summary: 'Check Product Availability' })
  @ApiQuery({
    name: 'walletAddress',
    required: true,
    type: String,
    description: 'wallet address',
  })
  @ApiQuery({
    name: 'category',
    required: true,
    type: String,
    description: 'product category',
  })
  @ApiQuery({
    name: 'medication',
    required: true,
    type: String,
    description: 'medicine name',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ProductExistDto,
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async checkProductExist(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
    @Query('category') category: string,
    @Query('medication') productPrescribed: string,
  ) {
    this.logger.log(`Create Product Availability Request\t${ip}`);
    return await this.pharmacistService.checkMedicineExist({
      walletAddress,
      category,
      productPrescribed,
    });
  }
}