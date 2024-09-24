import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Ip,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminDto, CreateAdminDto, UpdateAdminDto } from '../dto/admin.dto';
import { Types } from 'mongoose';
import { AdminAuthGuard } from '../guards/admin.auth.guard';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import { AdminErrors } from '@/modules/admin/data/admin.data';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  private readonly logger = new MyLoggerService(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Get('allAdmins')
  @ApiOperation({ summary: 'returns all admins' })
  @ApiResponse({
    status: 200,
    type: AdminDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: AdminErrors.NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
  })
  async getAllAdmins(@Ip() ip: string) {
    this.logger.log(`Get all admin request ${ip}`);
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
  @UseGuards(AdminAuthGuard)
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

  // @Post('modifyAdminAddress')
  // @UseGuards(AdminAuthGuard)
  // async modifyAddress(
  //   @Query('adminAddress') walletAddress: string,
  //   @Query('replaceAddress') replaceAddress: string,
  // ) {
  //   return await this.adminService.editAdmin({ walletAddress, replaceAddress });
  // }

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
