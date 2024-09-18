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

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('createDoctor')
  async createDoctor(@Body(ValidationPipe) createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.createDoctor(createDoctorDto);
  }

  @Post('updateDoctor')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async updateDoctor(
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorService.updateDoctor(
      walletAddress,
      updateDoctorDto,
    );
  }

  @Post('addPatientPrescription')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async addPatientPrescription(
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    prescriptionDto: CreatePrescriptionDto,
  ) {
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
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('recordId', new ValidationPipe({ transform: true }))
    recordId: Types.ObjectId,
  ) {
    return await this.doctorService.approveMedicalRecordAccessRequest({
      patientAddress: patientAddress,
      doctorAddress: doctorAddress,
      id: recordId,
    });
  }

  @Post('rejectRecordAccessRequest')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async rejectRecordAccessRequest(
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('recordId', new ValidationPipe({ transform: true }))
    recordId: Types.ObjectId,
  ) {
    return await this.doctorService.rejectMedicalRecordAccessRequest({
      patientAddress: patientAddress,
      doctorAddress: doctorAddress,
      id: recordId,
    });
  }

  @Post('createMedicalRecord')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async createMedicalRecordPreview(
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createMedicalRecordDto: CreateMedicalRecordDto,
  ) {
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
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.doctorService.deleteAllApprovalRequests(walletAddress);
  }

  @Get('doctorByAddress')
  async getDoctorByAddress(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.doctorService.getDoctorByAddress(walletAddress);
  }

  @Get('allDoctors')
  async getAllDoctors() {
    return await this.doctorService.getAllDoctors();
  }

  @Get('approvedDoctors')
  async getApprovedDoctors() {
    return await this.doctorService.getApprovedDoctors();
  }

  @Get('pendingDoctors')
  async getPendingDoctors() {
    return await this.doctorService.getPendingDoctors();
  }

  @Get('allRecordRequests')
  @UseGuards(DoctorAuthGuard, DoctorVerificationGuard)
  async getActiveApprovals(
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
  ) {
    return await this.doctorService.fetchAllActiveApprovals(doctorAddress);
  }

  @Delete('deleteDoctor')
  async deleteDoctorByAddress(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return this.doctorService.deleteDoctorByAddress(walletAddress);
  }
}
