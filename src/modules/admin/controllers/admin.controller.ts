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
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import { AdminErrors, AdminMessages } from '@/modules/admin/data/admin.data';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  private readonly logger = new MyLoggerService(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Get('allAdmins')
  @ApiOperation({ summary: 'returns all admins' })
  @ApiResponse({
    status: HttpStatus.OK,
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
  @ApiOperation({ summary: 'returns admin associated with a wallet address' })
  @ApiQuery({
    name: 'walletAddress',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: AdminDto,
    isArray: false,
  })
  @ApiBadRequestResponse({
    description: AdminErrors.FETCHING_ADMIN,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async getAdminByAddress(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Get admin by address request from ip ${ip}`);
    return await this.adminService.fetchAdminByAddress(walletAddress);
  }

  @Get('getAllPractitioners')
  @ApiOperation({ summary: 'fetch all practitioners (doctors & pharmacist)' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: true,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: AdminErrors.FETCHING_PRACTITIONERS,
  })
  async getAllPractitioners(@Ip() ip: string) {
    this.logger.log(`Get all practitioners request from ip ${ip}`);
    return await this.adminService.fetchAllPractitioners();
  }

  @Post('createAdmin')
  @ApiOperation({ summary: 'creates a new admin document' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AdminMessages.CREATE_ADMIN,
    type: AdminDto,
    isArray: false,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AdminErrors.CREATE_ADMIN,
  })
  async createAdmin(
    @Ip() ip: string,
    @Body(ValidationPipe) createAdminDto: CreateAdminDto,
  ) {
    this.logger.log(
      `Create new admin request from address ${createAdminDto.walletAddress}, ip ${ip}`,
    );
    return await this.adminService.createNewAdmin(createAdminDto);
  }

  @Post('updateAdmin')
  @ApiOperation({ summary: 'updates an admin document' })
  @ApiQuery({ description: 'admin ethereum address', name: 'walletAddress' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AdminMessages.ADMIN_UPDATED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AdminErrors.ADMIN_UPDATE_ERROR,
  })
  @UseGuards(AdminAuthGuard)
  async updateAdmin(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    this.logger.log(
      `Update admin request from address ${walletAddress}, ip ${ip}`,
    );
    return await this.adminService.updateAdmin({
      walletAddress,
      data: updateAdminDto,
    });
  }

  @Post('approveHospital')
  @ApiOperation({ summary: 'approves an institution' })
  @ApiQuery({
    name: 'adminAddress',
    description: 'authenticated admin address',
    type: String,
  })
  @ApiQuery({
    name: 'hospitalId',
    description: 'hospital mongo uuid',
    type: Types.ObjectId.toString(),
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AdminMessages.HOSPITAL_APPROVED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AdminErrors.HOSPITAL_APPROVE_ERROR,
  })
  @UseGuards(AdminAuthGuard)
  async approveHospital(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('hospitalId', new ValidationPipe({ transform: true }))
    hospitalId: Types.ObjectId,
  ) {
    this.logger.log(
      `Request to approve hospital from wallet address ${adminAddress}, ip ${ip}`,
    );
    return await this.adminService.approveHospital({ hospitalId });
  }

  @Post('authenticateAdmin')
  @ApiOperation({ summary: 'authenticates an admin' })
  @ApiQuery({
    name: 'adminAddress',
    description: 'an authenticated admin address',
    type: String,
  })
  @ApiQuery({
    name: 'walletAddress',
    description: 'an admin address to authenticate',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AdminMessages.AUTH_SUCCESSFUL,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AdminErrors.AUTH_ERROR,
  })
  @UseGuards(AdminAuthGuard)
  async authenticateAdmin(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddress: string,
    @Query('adminToAuthenticate', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('blockchainId') id: number,
  ) {
    this.logger.log(
      `Authenticate admin request from wallet address ${adminAddress}, ip address ${ip}`,
    );
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
  @ApiOperation({ summary: 'removes an admin document' })
  @ApiQuery({
    name: 'adminAddressToAuthorize',
    description: 'an authenticated ethereum address',
  })
  @ApiQuery({
    name: 'adminAddressToRemove',
    description: 'an admin ethereum address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AdminMessages.ADMIN_REMOVED,
    isArray: false,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: AdminErrors.ADMIN_REMOVED_ERROR,
  })
  @UseGuards(AdminAuthGuard)
  async deleteAdmin(
    @Ip() ip: string,
    @Query('adminAddress', new ValidationPipe({ transform: true }))
    adminAddressToAuthorize: string,
    @Query('adminAddressToRemove', new ValidationPipe({ transform: true }))
    adminAddressToRemove: string,
  ) {
    this.logger.log(
      `Delete admin request from wallet ${adminAddressToAuthorize}, ip ${ip}`,
    );
    return await this.adminService.removeAdmin({ adminAddressToRemove });
  }
}
