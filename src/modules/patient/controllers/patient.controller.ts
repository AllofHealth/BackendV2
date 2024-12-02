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
import { PatientService } from '../services/patient.service';
import {
  CreateApprovalDto,
  CreateFamilyMemberApprovalDto,
  CreateFamilyMemberDto,
  CreatePatientDto,
  FamilyMemberDto,
  PatientDto,
  SharePrescriptionDto,
  UpdateFamilyMemberDto,
  UpdatePatientProfileDto,
} from '../dto/patient.dto';
import { Types } from 'mongoose';
import {
  FamilyMemberGuard,
  PatientAuthGuard,
  PatientVerificationGuard,
} from '../guards/patient.auth.guard';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  PatientErrors,
  PatientSuccess,
} from '@/modules/patient/data/patient.data';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  private readonly logger = new MyLoggerService(PatientController.name);
  constructor(private readonly patientService: PatientService) {}

  @Post('createNewPatient')
  @ApiOperation({ summary: 'creates a new patient document' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.PATIENT_CREATED,
    type: PatientDto,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: PatientErrors.PATIENT_CREATED_ERROR,
  })
  async createNewPatient(
    @Ip() ip: string,
    @Body(ValidationPipe) createPatientType: CreatePatientDto,
  ) {
    this.logger.log(`Create New Patient Request\t${ip}`);
    return await this.patientService.createNewPatient(createPatientType);
  }

  @Post('updatePatient')
  @ApiOperation({ summary: 'update a patient document' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.PATIENT_UPDATED,
  })
  @ApiOkResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.PATIENT_UPDATE_ERROR,
  })
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async updatePatient(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    updatePatientDto: UpdatePatientProfileDto,
  ) {
    this.logger.log(
      `Update Patient Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.updatePatient(
      walletAddress,
      updatePatientDto,
    );
  }

  @Post('createFamilyMember')
  @ApiOperation({ summary: 'creates a family member document' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.FAMILY_MEMBER_ADDED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.FAMILY_MEMBER_ERROR,
  })
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async createFamilyMember(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    this.logger.log(
      `Create Family Member Request\t${ip}\t wallet address ${walletAddress}`,
    );
    return await this.patientService.addFamilyMember({
      walletAddress,
      familyMember: createFamilyMemberDto,
    });
  }

  @Post('updateFamilyMember')
  @ApiOperation({ summary: 'updates a family member document' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.FAMILY_MEMBER_UPDATED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.FAMILY_MEMBER_UPDATE_ERROR,
  })
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async updateFamilyMember(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('familyMemberId', new ValidationPipe({ transform: true }))
    familyMemberId: number,
    @Body(new ValidationPipe({ transform: true }))
    updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    this.logger.log(
      `Update Family Member Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.editFamilyMember({
      walletAddress,
      familyMemberId,
      updateData: updateFamilyMemberDto,
    });
  }

  @Post('sharePrescription')
  @ApiOperation({ summary: 'share prescription to a pharmacist' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiQuery({
    name: 'pharmacistAddress',
    description: 'an approved pharmacist ethereum address',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.PRESCRIPTION_SHARED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.SHARE_PRESCRIPTION_ERROR,
  })
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async sharePrescription(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('pharmacistAddress', new ValidationPipe({ transform: true }))
    pharmacistAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    sharePrescriptionDto: SharePrescriptionDto,
  ) {
    this.logger.log(
      `Share Prescription Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.sharePrescription({
      walletAddress,
      pharmacistAddress,
      prescriptionId: sharePrescriptionDto.prescriptionId,
    });
  }

  @Post('removePrescription')
  @ApiOperation({ summary: 'removes a patient prescription' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiQuery({
    name: 'prescriptionId',
    description: 'prescription mongo id',
    type: Types.ObjectId,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.PRESCRIPTION_DELETED,
    isArray: false,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.PATIENT_DELETE_ERROR,
    isArray: false,
  })
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async removePrescription(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    this.logger.log(
      `Remove Prescription Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.removePrescriptions(
      walletAddress,
      prescriptionId,
    );
  }

  @Post('approveMedicalRecordAccess')
  @ApiOperation({ summary: 'approve access to medical record' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.MEDICAL_RECORD_ACCESS_APPROVED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.APPROVE_MEDICAL_RECORD_ERROR,
  })
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async approveMedicalRecordAccess(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createApprovalDto: CreateApprovalDto,
  ) {
    this.logger.log(
      `Approve Medical Record Access Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.approveMedicalRecordAccess({
      recordId: createApprovalDto.recordId,
      patientAddress: walletAddress,
      doctorAddress: createApprovalDto.doctorAddress,
      approvalType: createApprovalDto.approvalType,
      approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
    });
  }

  @Post('approveFamilyMemberRecordAccess')
  @ApiOperation({ summary: 'approve access to family member medical record' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.FAMILY_MEDICAL_RECORD_ACCESS_APPROVED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.APPROVE_MEDICAL_RECORD_FAMILY,
  })
  @UseGuards(FamilyMemberGuard)
  async approveFamilyMemberRecordAccess(
    @Ip() ip: string,
    @Query('principalPatientAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createApprovalDto: CreateFamilyMemberApprovalDto,
  ) {
    this.logger.log(
      `Approve Family Member Record Access Request\t${ip}\t wallet address ${walletAddress}`,
    );
    return await this.patientService.approveMedicalRecordAccessForFamilyMember({
      recordId: createApprovalDto.recordId,
      familyMemberId: createApprovalDto.familyMemberId,
      patientAddress: walletAddress,
      doctorAddress: createApprovalDto.doctorAddress,
      approvalType: createApprovalDto.approvalType,
      approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
    });
  }

  @Get('allPatients')
  @ApiOperation({ summary: 'returns all patients documents' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: [PatientDto],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.PATIENT_FETCH_ERROR,
  })
  async getAllPatients(@Ip() ip: string) {
    this.logger.log(`Get All Patient Request\t${ip}`);
    return await this.patientService.findAllPatients();
  }

  @Get('allFamilyMembers')
  @ApiOperation({
    summary: 'returns all family members associated with an ethereum address',
  })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.FAMILY_MEMBER_FOUND,
    isArray: true,
    type: [FamilyMemberDto],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.FAMILY_MEMBER_FETCH_ERROR,
  })
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async getAllFamilyMembers(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(
      `Get All Family Member Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.listFamilyMember(walletAddress);
  }

  @Get('getFamilyMemberById')
  @ApiOperation({
    summary:
      'returns a family members associated with an blockchain identifier',
  })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiQuery({
    name: 'memberId',
    description: 'family member blockchain id',
    type: Number,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: PatientSuccess.FAMILY_MEMBER_FOUND,
    type: FamilyMemberDto,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.FAMILY_MEMBER_FETCH_ERROR,
  })
  async getFamilyMemberById(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('memberId', new ValidationPipe({ transform: true }))
    memberId: number,
  ) {
    this.logger.log(
      `Get Family Member By Id Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.getFamilyMemberById({
      walletAddress,
      memberId,
    });
  }

  @Get('getPatientByAddress')
  @ApiOperation({ summary: 'returns a patient document' })
  @ApiQuery({
    name: 'walletAddress',
    description: 'patient ethereum address',
    type: String,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    isArray: false,
    type: PatientDto,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PatientErrors.PATIENT_FETCH_ERROR,
  })
  async getPatientByAddress(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(
      `Get Patient By Id Request\t${ip} \t wallet address ${walletAddress}`,
    );
    return await this.patientService.fetchPatientByWalletAddress(walletAddress);
  }

  @Get('allPrescriptions')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async getAllPrescriptions(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Get All Prescriptions Request\t${ip}`);
    return await this.patientService.fetchAllPrescriptions(walletAddress);
  }

  @Get('prescriptionById')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async getPrescription(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    this.logger.log(`Get Prescription By Id Request\t${ip}`);
    return await this.patientService.fetchPrescription(
      walletAddress,
      prescriptionId,
    );
  }

  @Get('allMedicalRecords')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async getAllMedicalRecords(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Get All Medical Record Request\t${ip}`);
    return await this.patientService.fetchAllMedicalRecords(walletAddress);
  }

  @Get('familyMemberMedicalRecords')
  @UseGuards(FamilyMemberGuard)
  async getFamilyMemberMedicalRecords(
    @Ip() ip: string,
    @Query('principalPatientAddress', new ValidationPipe({ transform: true }))
    principalPatientAddress: string,
    @Query('familyMemberId', new ValidationPipe({ transform: true }))
    familyMemberId: number,
  ) {
    this.logger.log(`Get Family Member Request\t${ip}`);
    return await this.patientService.fetchAllMedicalRecordsForFamilyMember({
      principalPatientAddress,
      familyMemberId,
    });
  }

  @Get('familyMemberRecordById')
  @UseGuards(FamilyMemberGuard)
  @ApiOperation({ summary: 'fetch a family member record' })
  async getFamilyMemberRecordById(
    @Ip() ip: string,
    @Query('principalPatientAddress', new ValidationPipe({ transform: true }))
    principalPatientAddress: string,
    @Query('familyMemberId', new ValidationPipe({ transform: true }))
    familyMemberId: number,
    @Query('recordId', new ValidationPipe({ transform: true }))
    recordId: number,
  ) {
    this.logger.log(`Get Family Member record by id Request\t${ip}`);
    return await this.patientService.fetchFamilyMemberRecordById({
      principalPatientAddress,
      familyMemberId,
      recordId,
    });
  }

  @Get('medicalRecordById')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async getMedicalRecord(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('recordId') recordId: number,
  ) {
    this.logger.log(`Get Medical Record By Id Request\t${ip}`);
    return await this.patientService.fetchMedicalRecordById({
      walletAddress,
      recordId,
    });
  }

  @Delete('deletePatient')
  async deletePatient(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Delete Patient Request\t${ip}`);
    return await this.patientService.deletePatientByAddress(walletAddress);
  }
}