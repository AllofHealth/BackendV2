import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DoctorService } from '../services/doctor.service';
import {
  CreateDoctorDto,
  CreatePrescriptionDto,
  UpdateDoctorDto,
} from '../dto/doctor.dto';
import { Types } from 'mongoose';

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
  async addPatientPrescription(
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    prescriptionDto: CreatePrescriptionDto,
  ) {
    return await this.doctorService.createPrescription({
      recordId: prescriptionDto.recordId,
      patientAddress,
      doctorAddress,
      medicineName: prescriptionDto.medicineName,
      medicineId: prescriptionDto.medicineId,
      medicineGroup: prescriptionDto.medicineGroup,
      description: prescriptionDto.description,
      sideEffects: prescriptionDto.sideEffects,
    });
  }

  @Post('approveRecordAccessRequest')
  async approveRecordAccessRequest(
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
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
  async rejectRecordAccessRequest(
    @Query('patientAddress', new ValidationPipe({ transform: true }))
    patientAddress: string,
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Query('recordId', new ValidationPipe({ transform: true }))
    recordId: Types.ObjectId,
  ) {
    return await this.doctorService.rejectMedicalRecordAccessRequest({
      patientAddress: patientAddress,
      doctorAddress: doctorAddress,
      id: recordId,
    });
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

  @Delete('deleteDoctor')
  async deleteDoctorByAddress(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return this.doctorService.deleteDoctorByAddress(walletAddress);
  }
}
