import {
  Body,
  Controller,
  Delete,
  Get,
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
  SharePrescriptionDto,
  UpdateFamilyMemberDto,
  UpdatePatientProfileDto,
} from '../dto/patient.dto';
import { Types } from 'mongoose';
import {
  PatientAuthGuard,
  PatientVerificationGuard,
} from '../guards/patient.auth.guard';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';

@Controller('patient')
export class PatientController {
  private readonly logger = new MyLoggerService(PatientController.name);

  constructor(private readonly patientService: PatientService) {}

  @Post('createNewPatient')
  async createNewPatient(
    @Ip() ip: string,
    @Body(ValidationPipe) createPatientType: CreatePatientDto,
  ) {
    this.logger.log(`Create New Patient Request\t${ip}`);
    return await this.patientService.createNewPatient(createPatientType);
  }

  @Post('updatePatient')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async updatePatient(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    updatePatientDto: UpdatePatientProfileDto,
  ) {
    this.logger.log(`Update Patient Request\t${ip}`);
    return await this.patientService.updatePatient(
      walletAddress,
      updatePatientDto,
    );
  }

  @Post('createFamilyMember')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async createFamilyMember(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    this.logger.log(`Create Family Member Request\t${ip}`);
    return await this.patientService.addFamilyMember({
      walletAddress,
      familyMember: createFamilyMemberDto,
    });
  }

  @Post('updateFamilyMember')
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
    this.logger.log(`Update Family Member Request\t${ip}`);
    return await this.patientService.editFamilyMember({
      walletAddress,
      familyMemberId,
      updateData: updateFamilyMemberDto,
    });
  }

  @Post('sharePrescription')
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
    this.logger.log(`Share Prescription Request\t${ip}`);
    return await this.patientService.sharePrescription({
      walletAddress,
      pharmacistAddress,
      prescriptionId: sharePrescriptionDto.prescriptionId,
    });
  }

  @Post('removePrescription')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async removePrescription(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    this.logger.log(`Remove Prescription Request\t${ip}`);
    return await this.patientService.removePrescriptions(
      walletAddress,
      prescriptionId,
    );
  }

  @Post('approveMedicalRecordAccess')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async approveMedicalRecordAccess(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createApprovalDto: CreateApprovalDto,
  ) {
    this.logger.log(`Approve Medical Record Access Request\t${ip}`);
    return await this.patientService.approveMedicalRecordAccess({
      recordId: createApprovalDto.recordId,
      patientAddress: walletAddress,
      doctorAddress: createApprovalDto.doctorAddress,
      approvalType: createApprovalDto.approvalType,
      approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
    });
  }

  @Post('approveFamilyMemberRecordAccess')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async approveFamilyMemberRecordAccess(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createApprovalDto: CreateFamilyMemberApprovalDto,
  ) {
    this.logger.log(`Approve Family Member Record Access Request\t${ip}`);
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
  async getAllPatients(@Ip() ip: string) {
    this.logger.log(`Get All Patient Request\t${ip}`);
    return await this.patientService.findAllPatients();
  }

  @Get('allFamilyMembers')
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async getAllFamilyMembers(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Get All Family Member Request\t${ip}`);
    return await this.patientService.listFamilyMember(walletAddress);
  }

  @Get('getFamilyMemberById')
  async getFamilyMemberById(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('memberId', new ValidationPipe({ transform: true }))
    memberId: number,
  ) {
    this.logger.log(`Get Family Member By Id Request\t${ip}`);
    return await this.patientService.getFamilyMemberById({
      walletAddress,
      memberId,
    });
  }

  @Get('getPatientByAddress')
  async getPatientByAddress(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    this.logger.log(`Get Patient By Id Request\t${ip}`);
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
  @UseGuards(PatientAuthGuard, PatientVerificationGuard)
  async getFamilyMemberMedicalRecords(
    @Ip() ip: string,
    @Query('walletAddress', new ValidationPipe({ transform: true }))
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
