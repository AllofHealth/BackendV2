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
import { CreatePatientDto, UpdatePatientProfileDto } from '../dto/patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('createNewPatient')
  async createNewPatient(
    @Body(ValidationPipe) createPatientType: CreatePatientDto,
  ) {
    return await this.patientService.createNewPatient(createPatientType);
  }

  @Post('updatePatient')
  async updatePatient(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    updatePatientDto: UpdatePatientProfileDto,
  ) {
    return await this.patientService.updatePatient(
      walletAddress,
      updatePatientDto,
    );
  }

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

  @Delete('deletePatient')
  async deletePatient(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.deletePatientByAddress(walletAddress);
  }
}
