import {
  Body,
  Controller,
  Get,
  Ip,
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
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';

@Controller('hospital')
export class HospitalController {
  private readonly logger = new MyLoggerService(HospitalController.name);

  constructor(private readonly hospitalService: HospitalService) {}

  @Post('createHospital')
  async createHospital(
    @Ip() ip: string,
    @Body(ValidationPipe) createHospitalDto: CreateHospitalDto,
  ) {
    this.logger.log(`Create Hospital Request\t${ip}`);
    return await this.hospitalService.createNewHospital(createHospitalDto);
  }

  @Post('joinHospital')
  @UseGuards(HospitalApprovedGuard)
  async joinHospital(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    joinHospitalDto: string,
  ) {
    this.logger.log(`Join Hospital Request\t${ip}`);
    return await this.hospitalService.joinHospital({
      hospitalId,
      walletAddress: joinHospitalDto,
    });
  }

  @Post('approvePractitioner')
  @UseGuards(HospitalAuthGuard)
  async approvePractitioner(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Query('practitionerAddress', new ValidationPipe({ transform: true }))
    practitionerAddress: string,
  ) {
    this.logger.log(`Approve Practitioner Request\t${ip}`);
    return await this.hospitalService.approvePractitioner({
      hospitalId,
      walletAddress: practitionerAddress,
    });
  }

  @Post('removePractitioner')
  @UseGuards(HospitalAuthGuard)
  async removePractitioner(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Query('practitionerAddress', new ValidationPipe({ transform: true }))
    practitionerAddress: string,
  ) {
    this.logger.log(`Remove Practitioner Request\t${ip}`);
    return await this.hospitalService.removePractitionerFromHospital({
      hospitalId,
      walletAddress: practitionerAddress,
    });
  }

  @Post('delegateAdmin')
  @UseGuards(HospitalAuthGuard)
  async delegateAdmin(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('newAdminAddress', new ValidationPipe({ transform: true }))
    newAdminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Delegate Admin Request\t${ip}`);
    return await this.hospitalService.delegateAdminPosition(
      newAdminAddress,
      hospitalId,
    );
  }

  @Post('updateHospital')
  @UseGuards(HospitalAuthGuard)
  async updateHospital(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Body() updateHospitalDto: UpdateHospitalProfileDto,
  ) {
    this.logger.log(`Update Hospital Request\t${ip}`);
    return await this.hospitalService.updateHospitalProfile(
      hospitalId,
      updateHospitalDto,
    );
  }

  @Get('hospitalById')
  async getHospitalById(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get Hospital By Id Request\t${ip}`);
    return await this.hospitalService.fetchHospitalById(hospitalId);
  }

  @Get('allHospitals')
  async getAllHospitals(@Ip() ip: string) {
    this.logger.log(`Get All Hospitals Request\t${ip}`);
    return await this.hospitalService.fetchAllHospitals();
  }

  @Get('approvedHospitals')
  async getApprovedHospitals(@Ip() ip: string) {
    this.logger.log(`Get Approved Hospitals  Request\t${ip}`);
    return await this.hospitalService.fetchApprovedHospitals();
  }

  @Get('pendingHospitals')
  async getPendingHospitals(@Ip() ip: string) {
    this.logger.log(`Get Pending Hospitals Request\t${ip}`);
    return await this.hospitalService.fetchPendingHospitals();
  }

  @Get('approvedDoctors')
  async getApprovedDoctors(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get Approved Doctors Request\t${ip}`);
    return await this.hospitalService.fetchApprovedDoctors(hospitalId);
  }

  @Get('pendingDoctors')
  async getPendingDoctors(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get Pending Doctors Request\t${ip}`);
    return await this.hospitalService.fetchPendingDoctors(hospitalId);
  }

  @Get('allDoctors')
  async getAllDoctors(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get All Doctors Request\t${ip}`);
    return await this.hospitalService.fetchAllDoctors(hospitalId);
  }

  @Get('approvedPharmacists')
  async getApprovedPharmacists(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get Approved Pharmacist Request\t${ip}`);
    return await this.hospitalService.fetchApprovedPharmacists(hospitalId);
  }

  @Get('pendingPharmacists')
  async getPendingPharmacists(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get Pending Pharmacist Request\t${ip}`);
    return await this.hospitalService.fetchPendingPharmacists(hospitalId);
  }

  @Get('allPharmacists')
  async getAllPharmacists(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get All Pharmacist Request\t${ip}`);
    return await this.hospitalService.fetchAllPharmacists(hospitalId);
  }

  @Get('allPractitioners')
  async getAllPractitioners(
    @Ip() ip: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(`Get All Practitioners Request\t${ip}`);
    return await this.hospitalService.fetchHospitalPractitioners(hospitalId);
  }

  @Get('practitionerCreatedHospitals')
  async getPractitionerCreatedHospital(
    @Ip() ip: string,
    @Query('walletAddress') walletAddress: string,
  ) {
    this.logger.log(`Get Practitioner Created Hospital Request\t${ip}`);
    return await this.hospitalService.fetchPractitionerCreatedHospital(
      walletAddress,
    );
  }
}
