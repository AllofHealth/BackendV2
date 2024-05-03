import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { HospitalService } from '../services/hospital.service';
import { Types } from 'mongoose';
import { CreateHospitalDto } from '../dto/hospital.dto';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post('createHospital')
  async createHospital(
    @Body(ValidationPipe) createHospitalDto: CreateHospitalDto,
  ) {
    return await this.hospitalService.createNewHospital(createHospitalDto);
  }

  @Post('delegateAdmin')
  async delegateAdmin(
    @Body(ValidationPipe)
    args: {
      newAdminAddress: string;
      adminAddress: string;
      hospitalId: Types.ObjectId;
    },
  ) {
    return await this.hospitalService.delegateAdminPosition(
      args.newAdminAddress,
      args.adminAddress,
      args.hospitalId,
    );
  }

  @Get('hospitalById')
  async getHospitalById(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchHospitalById(hospitalId);
  }

  @Get('allHospitals')
  async getAllHospitals() {
    return await this.hospitalService.fetchAllHospitals();
  }

  @Get('approvedHospitals')
  async getApprovedHospitals() {
    return await this.hospitalService.fetchApprovedHospitals();
  }

  @Get('pendingHospitals')
  async getPendingHospitals() {
    return await this.hospitalService.fetchPendingHospitals();
  }

  @Get('approvedDoctors')
  async getApprovedDoctors(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchApprovedDoctors(hospitalId);
  }

  @Get('pendingDoctors')
  async getPendingDoctors(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchPendingDoctors(hospitalId);
  }

  @Get('allDoctors')
  async getAllDoctors(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchAllDoctors(hospitalId);
  }

  @Get('approvedPharmacists')
  async getApprovedPharmacists(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchApprovedPharmacists(hospitalId);
  }

  @Get('pendingPharmacists')
  async getPendingPharmacists(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchPendingPharmacists(hospitalId);
  }

  @Get('allPharmacists')
  async getAllPharmacists(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchAllPharmacists(hospitalId);
  }
}
