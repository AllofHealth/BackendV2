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
import { CreateDoctorDto, UpdateDoctorDto } from '../dto/doctor.dto';

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
