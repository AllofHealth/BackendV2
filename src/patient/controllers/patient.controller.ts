import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientType } from '../interface/patient.interface';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('allPatients')
  async getAllPatients() {
    return await this.patientService.findAllPatients();
  }

  @Get('getPatientByAddress')
  async getPatientByAddress(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.fetchPatientByWalletAddress(walletAddress);
  }

  @Post('createNewPatient')
  async createNewPatient(
    @Body(ValidationPipe) createPatientType: CreatePatientType,
  ) {
    return await this.patientService.createNewPatient(createPatientType);
  }

  @Delete('deletePatient')
  async deletePatient(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.deletePatientByAddress(walletAddress);
  }
}
