import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { HospitalService } from '../services/hospital.service';
import { Types } from 'mongoose';
import {
  CreateHospitalDto,
  UpdateHospitalProfileDto,
} from '../dto/hospital.dto';
import { HospitalAuthGuard } from '../guard/hospital.auth.guard';
import { HospitalApprovedGuard } from '../guard/hospital.approved.guard';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post('createHospital')
  async createHospital(
    @Body(ValidationPipe) createHospitalDto: CreateHospitalDto,
  ) {
    return await this.hospitalService.createNewHospital(createHospitalDto);
  }

  @Post('joinHospital')
  @UseGuards(HospitalApprovedGuard)
  async joinHospital(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    joinHospitalDto: string,
  ) {
    return await this.hospitalService.joinHospital({
      hospitalId,
      walletAddress: joinHospitalDto,
    });
  }

  @Post('approvePractitioner')
  @UseGuards(HospitalAuthGuard)
  async approvePractitioner(
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Query('practitionerAddress', new ValidationPipe({ transform: true }))
    practitionerAddress: string,
  ) {
    return await this.hospitalService.approvePractitioner({
      hospitalId,
      walletAddress: practitionerAddress,
    });
  }

  @Post('removePractitioner')
  @UseGuards(HospitalAuthGuard)
  async removePractitioner(
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Query('practitionerAddress', new ValidationPipe({ transform: true }))
    practitionerAddress: string,
  ) {
    return await this.hospitalService.removePractitionerFromHospital({
      hospitalId,
      walletAddress: practitionerAddress,
    });
  }

  @Post('delegateAdmin')
  @UseGuards(HospitalAuthGuard)
  async delegateAdmin(
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('newAdminAddress', new ValidationPipe({ transform: true }))
    newAdminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.delegateAdminPosition(
      newAdminAddress,
      hospitalId,
    );
  }

  @Post('updateHospital')
  @UseGuards(HospitalAuthGuard)
  async updateHospital(
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Body() updateHospitalDto: UpdateHospitalProfileDto,
  ) {
    return await this.hospitalService.updateHospitalProfile(
      hospitalId,
      updateHospitalDto,
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

  @Get('allPractitioners')
  async getAllPractitioners(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.hospitalService.fetchHospitalPractitioners(hospitalId);
  }

  @Get('practitionerCreatedHospitals')
  async getPractitionerCreatedHospital(
    @Query('walletAddress') walletAddress: string,
  ) {
    return await this.hospitalService.fetchPractitionerCreatedHospital(
      walletAddress,
    );
  }
}
