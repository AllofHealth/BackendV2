import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import {
  ApproveHospitalDto,
  CreateAdminDto,
  RemoveAdminDto,
  UpdateAdminDto,
} from '../dto/admin.dto';
import { Types } from 'mongoose';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('allAdmins')
  async getAllAdmins() {
    return await this.adminService.fetchAllAdmins();
  }

  @Get('getAdminByAddress')
  async getAdminByAddress(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.adminService.fetchAdminByAddress(walletAddress);
  }

  @Post('createAdmin')
  async createAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    return await this.adminService.createNewAdmin(createAdminDto);
  }

  @Post('updateAdmin')
  async updateAdmin(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.updateAdmin({
      walletAddress,
      data: updateAdminDto,
    });
  }

  @Post('approveHospital')
  async approveHospital(
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
  ) {
    const approveHospitalDto: ApproveHospitalDto = { hospitalId, adminAddress };
    return await this.adminService.approveHospital(approveHospitalDto);
  }

  @Delete('deleteAdmin')
  async deleteAdmin(
    @Query('adminAddressToAuthorize', new ValidationPipe({ transform: true }))
    adminAddressToAuthorize: string,
    @Query('adminAddressToRemove', new ValidationPipe({ transform: true }))
    adminAddressToRemove: string,
  ) {
    const deleteAdminDto: RemoveAdminDto = {
      adminAddressToAuthorize,
      adminAddressToRemove,
    };
    return await this.adminService.removeAdmin(deleteAdminDto);
  }
}
