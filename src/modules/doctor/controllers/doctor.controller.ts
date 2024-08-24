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
import { DoctorAuthGuard } from '../guards/doctor.auth.guard';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('createDoctor')
  async createDoctor(@Body(ValidationPipe) createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.createDoctor(createDoctorDto);
  }

  @Post('updateDoctor')
  async updateDoctor(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorService.updateDoctor(
      walletAddress,
      updateDoctorDto,
    );
  }

  @Post('addPatientPrescription')
  @UseGuards(DoctorAuthGuard)
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
  @UseGuards(DoctorAuthGuard)
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
  @UseGuards(DoctorAuthGuard)
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
  @UseGuards(DoctorAuthGuard)
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

  @Post('deleteAllApprovalRequests')
  @UseGuards(DoctorAuthGuard)
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
