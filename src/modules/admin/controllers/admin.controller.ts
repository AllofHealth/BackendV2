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
import { AdminService } from '../services/admin.service';
import { CreateAdminDto, UpdateAdminDto } from '../dto/admin.dto';
import { Types } from 'mongoose';
import { AdminAuthGuard } from '../guards/admin.auth.guard';

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

  @Get('getAllPractitioners')
  async getAllPractitioners() {
    return await this.adminService.fetchAllPractitioners();
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
  @UseGuards(AdminAuthGuard)
  async approveHospital(
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    return await this.adminService.approveHospital({ hospitalId });
  }

  @Post('authenticateAdmin')
  @UseGuards(AdminAuthGuard)
  async authenticateAdmin(
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('adminToAuthenticate', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('blockchainId') id: number,
  ) {
    return await this.adminService.authenticateAdmin({
      addressToAuthenticate: walletAddress,
      blockchainId: id,
    });
  }

  @Post('modifyAdminAddress')
  @UseGuards(AdminAuthGuard)
  async modifyAddress(
    @Query('adminAddress') walletAddress: string,
    @Query('replaceAddress') replaceAddress: string,
  ) {
    return await this.adminService.editAdmin({ walletAddress, replaceAddress });
  }

  @Delete('deleteAdmin')
  @UseGuards(AdminAuthGuard)
  async deleteAdmin(
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddressToAuthorize: string,
    @Query('adminAddressToRemove', new ValidationPipe({ transform: true }))
    adminAddressToRemove: string,
  ) {
    return await this.adminService.removeAdmin({ adminAddressToRemove });
  }
}
