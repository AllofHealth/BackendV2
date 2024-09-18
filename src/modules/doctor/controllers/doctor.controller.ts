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
import { DoctorService } from '../services/doctor.service';
import {
  CreateDoctorDto,
  CreateMedicalRecordDto,
  CreatePrescriptionDto,
  UpdateDoctorDto,
} from '../dto/doctor.dto';
import { Types } from 'mongoose';
import {
  DoctorAuthGuard,
  DoctorVerificationGuard,
} from '../guards/doctor.auth.guard';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  private readonly logger = new MyLoggerService(DoctorController.name);

  constructor(private readonly doctorService: DoctorService) {}

  @Post('createDoctor')
  async createDoctor(
    @Ip() ip: string,
    @Body(ValidationPipe) createDoctorDto: CreateDoctorDto,
  ) {
    this.logger.log(`Create New Doctor Request\t${ip}`);
    return await this.doctorService.createDoctor(createDoctorDto);
  }

  @Post('updateDoctor')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async updateDoctor(
    @Ip() ip: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    this.logger.log(`Update Doctor Request\t${ip}`);
    return await this.doctorService.updateDoctor(
      walletAddress,
      updateDoctorDto,
    );
  }

  @Post('addPatientPrescription')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async addPatientPrescription(
    @Ip() ip: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    prescriptionDto: CreatePrescriptionDto,
  ) {
    this.logger.log(`Add Patient Prescription Request\t${ip}`);
    return await this.doctorService.createPrescription({
      recordId: prescriptionDto.recordId,
      patientAddress,
      doctorAddress,
      medicine: prescriptionDto.medicine,
    });
  }

  @Post('approveRecordAccessRequest')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async approveRecordAccessRequest(
    @Ip() ip: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('recordId', new ValidationPipe({ transform: true }))
    recordId: Types.ObjectId,
  ) {
    this.logger.log(`Approve Record Access Request\t${ip}`);
    return await this.doctorService.approveMedicalRecordAccessRequest({
      patientAddress: patientAddress,
      doctorAddress: doctorAddress,
      id: recordId,
    });
  }

  @Post('rejectRecordAccessRequest')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async rejectRecordAccessRequest(
    @Ip() ip: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('recordId', new ValidationPipe({ transform: true }))
    recordId: Types.ObjectId,
  ) {
    this.logger.log(`Reject Record Request\t${ip}`);
    return await this.doctorService.rejectMedicalRecordAccessRequest({
      patientAddress: patientAddress,
      doctorAddress: doctorAddress,
      id: recordId,
    });
  }

  @Post('createMedicalRecord')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async createMedicalRecordPreview(
    @Ip() ip: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createMedicalRecordDto: CreateMedicalRecordDto,
  ) {
    this.logger.log(`Create Medical Record Request\t${ip}`);
    return await this.doctorService.createMedicalRecord({
      recordId: createMedicalRecordDto.recordId,
      principalPatientAddress: patientAddress,
      doctorAddress: doctorAddress,
      diagnosis: createMedicalRecordDto.diagnosis,
    });
  }

  @Post('swapId')
  async swapId(
    @Query('walletAddress') walletAddress: string,
    @Query('id') id: number,
  ) {
    return await this.doctorService.swapId(walletAddress, id);
  }

  @Post('deleteAllApprovalRequests')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async deleteAllApprovalRequests(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Delete All Record Request\t${ip}`);
    return await this.doctorService.deleteAllApprovalRequests(walletAddress);
  }

  @Get('doctorByAddress')
  async getDoctorByAddress(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Doctor By Address Request\t${ip}`);
    return await this.doctorService.getDoctorByAddress(walletAddress);
  }

  @Get('allDoctors')
  async getAllDoctors(@Ip() ip: string) {
    this.logger.log(`Get All Doctors Request\t${ip}`);
    return await this.doctorService.getAllDoctors();
  }

  @Get('approvedDoctors')
  async getApprovedDoctors(@Ip() ip: string) {
    this.logger.log(`Get Approved Doctors Request\t${ip}`);
    return await this.doctorService.getApprovedDoctors();
  }

  @Get('pendingDoctors')
  async getPendingDoctors(@Ip() ip: string) {
    this.logger.log(`Get Pending Doctors Request\t${ip}`);
    return await this.doctorService.getPendingDoctors();
  }

  @Get('allRecordRequests')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async getActiveApprovals(
    @Ip() ip: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
  ) {
    this.logger.log(`Get Active Approval Request\t${ip}`);
    return await this.doctorService.fetchAllActiveApprovals(doctorAddress);
  }

  @Delete('deleteDoctor')
  async deleteDoctorByAddress(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Delete Doctor Request\t${ip}`);
    return this.doctorService.deleteDoctorByAddress(walletAddress);
  }
}
