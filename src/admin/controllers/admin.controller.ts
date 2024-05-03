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
import { CreateAdminType, RemoveAdminType } from '../interface/admin.interface';

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
  async createAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminType) {
    return await this.adminService.createNewAdmin(createAdminDto);
  }

  @Delete('deleteAdmin')
  async deleteAdmin(@Body(ValidationPipe) deleteAdminDto: RemoveAdminType) {
    return await this.adminService.removeAdmin(deleteAdminDto);
  }
}
