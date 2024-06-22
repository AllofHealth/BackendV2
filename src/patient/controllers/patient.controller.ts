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

  @Post('createFamilyMember')
  async createFamilyMember(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    return await this.patientService.addFamilyMember({
      walletAddress,
      familyMember: createFamilyMemberDto,
    });
  }

  @Post('updateFamilyMember')
  async updateFamilyMember(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('familyMemberId', new ValidationPipe({ transform: true }))
    familyMemberId: number,
    @Body(new ValidationPipe({ transform: true }))
    updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    return await this.patientService.editFamilyMember({
      walletAddress,
      familyMemberId,
      updateData: updateFamilyMemberDto,
    });
  }

  @Post('sharePrescription')
  async sharePrescription(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('pharmacistAddress', new ValidationPipe({ transform: true }))
    pharmacistAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    sharePrescriptionDto: SharePrescriptionDto,
  ) {
    return await this.patientService.sharePrescription({
      walletAddress,
      pharmacistAddress,
      prescriptionId: sharePrescriptionDto.prescriptionId,
    });
  }

  @Post('removePrescription')
  async removePrescription(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    return await this.patientService.removePrescriptions(
      walletAddress,
      prescriptionId,
    );
  }

  @Post('approveMedicalRecordAccess')
  async approveMedicalRecordAccess(
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createApprovalDto: CreateApprovalDto,
  ) {
    return await this.patientService.approveMedicalRecordAccess({
      recordId: createApprovalDto.recordId,
      patientAddress: createApprovalDto.patientAddress,
      doctorAddress: doctorAddress,
      approvalType: createApprovalDto.approvalType,
      approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
    });
  }

  @Post('approveFamilyMemberRecordAccess')
  async approveFamilyMemberRecordAccess(
    @Query('doctorAddress', new ValidationPipe({ transform: true }))
    doctorAddress: string,
    @Body(new ValidationPipe({ transform: true }))
    createApprovalDto: CreateFamilyMemberApprovalDto,
  ) {
    return await this.patientService.approveMedicalRecordAccessForFamilyMember({
      recordId: createApprovalDto.recordId,
      familyMemberId: createApprovalDto.familyMemberId,
      patientAddress: createApprovalDto.principalPatientAddress,
      doctorAddress,
      approvalType: createApprovalDto.approvalType,
      approvalDurationInSecs: createApprovalDto.approvalDurationInSec,
    });
  }

  @Get('allPatients')
  async getAllPatients() {
    return await this.patientService.findAllPatients();
  }

  @Get('allFamilyMembers')
  async getAllFamilyMembers(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.listFamilyMember(walletAddress);
  }

  @Get('getFamilyMemberById')
  async getFamilyMemberById(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('memberId', new ValidationPipe({ transform: true }))
    memberId: number,
  ) {
    return await this.patientService.getFamilyMemberById({
      walletAddress,
      memberId,
    });
  }

  @Get('getPatientByAddress')
  async getPatientByAddress(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.fetchPatientByWalletAddress(walletAddress);
  }

  @Get('allPrescriptions')
  async getAllPrescriptions(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.fetchAllPrescriptions(walletAddress);
  }

  @Get('prescriptionById')
  async getPrescription(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('prescriptionId', new ValidationPipe({ transform: true }))
    prescriptionId: Types.ObjectId,
  ) {
    return await this.patientService.fetchPrescription(
      walletAddress,
      prescriptionId,
    );
  }

  @Get('allMedicalRecords')
  async getAllMedicalRecords(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.fetchAllMedicalRecords(walletAddress);
  }

  @Get('medicalRecordById')
  async getMedicalRecord(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
    @Query('recordId') recordId: number,
  ) {
    return await this.patientService.fetchMedicalRecordById({
      walletAddress,
      recordId,
    });
  }

  @Delete('deletePatient')
  async deletePatient(
    @Query('walletAddress', new ValidationPipe({ transform: true }))
    walletAddress: string,
  ) {
    return await this.patientService.deletePatientByAddress(walletAddress);
  }
}
