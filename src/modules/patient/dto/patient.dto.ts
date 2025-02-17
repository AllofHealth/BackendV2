import {
  IsArray,
  IsDate,
  IsEmail,
  IsEthereumAddress,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { MedicineDto } from '@/modules/medicine/dto/medicine.dto';
import { TApprovalType } from '@/modules/patient/interface/patient.interface';

export class MedicalRecordDto {
  @ApiProperty({ type: Number, description: 'blockchain id' })
  id: number;

  @ApiProperty({ type: String })
  principalPatient: string;

  @ApiProperty({ type: String })
  doctorAddress: string;

  @ApiPropertyOptional({ type: String })
  diagnosis: string;

  @ApiProperty({ type: String })
  doctorsName: string;

  @ApiProperty({ type: String })
  hospitalName: string;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;
}

export class ReceiptDto {
  @ApiProperty({ type: String })
  productDispensed: string;

  @ApiProperty({ type: Date })
  dateDispensed: Date;

  @ApiProperty({ type: String })
  directions: string;

  @ApiProperty({ type: String })
  quantity: string;

  @ApiProperty({ type: String })
  price: string;
}

export class PrescriptionDto {
  @ApiProperty({ name: 'id', description: 'blockchain id', type: Number })
  recordId: number;

  @ApiProperty({ name: 'doctorName', type: String })
  doctorName: string;

  @ApiProperty({
    name: 'doctorAddress',
    type: String,
    description: 'doctor ethereum address',
  })
  doctorAddress: string;

  @ApiProperty({ name: 'institutionName', type: String })
  institutionName: string;

  @ApiProperty({ name: 'patientName', type: String })
  patientName: string;

  @ApiProperty({ name: 'patientAddress', type: String })
  patientAddress: string;

  @Prop({ type: [{ type: MedicineDto }] })
  medicine: MedicineDto[];

  @ApiProperty({ name: 'date', type: Date })
  date: Date;

  @ApiPropertyOptional({ name: 'status', type: String, default: 'pending' })
  status: string;

  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;
}

export class CreatePatientDto {
  @ApiProperty({ name: 'id', description: 'blockchain id', type: Number })
  @IsNumber()
  id: number;

  @ApiProperty({ name: 'name', type: String })
  @IsString()
  name: string;

  @ApiProperty({ name: 'age', type: Number })
  @IsNumber()
  age: number;

  @ApiProperty({ name: 'email', type: String })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ name: 'phoneNo', type: String })
  @IsString()
  @IsPhoneNumber()
  phoneNo: string;

  @ApiPropertyOptional({ name: 'profilePicture', type: String })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ name: 'address', type: String })
  @IsString()
  address: string;

  @ApiProperty({ name: 'city', type: String })
  @IsString()
  city: string;

  @ApiProperty({ name: 'bloodGroup', type: String })
  @IsNotEmpty()
  @IsString()
  bloodGroup: string;

  @ApiProperty({ name: 'genotype', type: String })
  @IsNotEmpty()
  @IsString()
  genotype: string;

  @ApiProperty({ name: 'walletAddress', type: String })
  @IsString()
  @IsEthereumAddress()
  walletAddress: string;

  @ApiPropertyOptional({ name: 'category', default: 'patient', type: String })
  @IsOptional()
  @IsString()
  category?: string;
}

export class FamilyMemberDto {
  @ApiProperty({ name: 'id', description: 'blockchain id', type: Number })
  @Prop({ required: true })
  id: number;

  @ApiProperty({ name: 'principalPatient', type: String })
  @Prop({ required: true })
  principalPatient: string;

  @ApiProperty({ name: 'name', type: String })
  @Prop({ required: true })
  name: string;

  @ApiPropertyOptional({ name: 'relationship', type: String })
  @Prop({ required: true })
  relationship: string;

  @ApiProperty({ name: 'email', type: String })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ name: 'address', type: String })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ name: 'age', type: Number })
  @Prop({ required: true })
  age: number;

  @ApiProperty({ name: 'dob', type: Date })
  @Prop({ sparse: true })
  dob: Date;

  @ApiProperty({ name: 'bloodGroup', type: String })
  @Prop({ required: true })
  bloodGroup: string;

  @ApiProperty({ name: 'genotype', type: String })
  @Prop({ required: true })
  genotype: string;

  @ApiProperty({ name: 'medicalRecords', type: [MedicalRecordDto] })
  medicalRecord: MedicalRecordDto[];

  @ApiProperty({ name: '_id', type: Types.ObjectId })
  @Prop()
  _id: Types.ObjectId;
}

export class PatientDto {
  @ApiProperty({ name: 'id', description: 'blockchain id', type: Number })
  @Prop({ required: true, unique: true })
  id: number;

  @ApiProperty({ name: 'appointmentCount', type: Number, default: 0 })
  @Prop()
  appointmentCount: number;

  @ApiProperty({ name: 'name', type: String })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ name: 'lastName', type: String })
  @Prop()
  lastName: string;

  @ApiProperty({ name: 'age', type: Number })
  @Prop({ required: true })
  age: number;

  @ApiProperty({ name: 'email', type: String })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ name: 'phoneNo', type: String })
  @Prop({ required: true })
  phoneNo: string;

  @ApiPropertyOptional({ name: 'profilePicture', type: String })
  @Prop()
  profilePicture: string;

  @ApiProperty({ name: 'address', type: String })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ name: 'city', type: String })
  @Prop({ required: true })
  city: string;

  @ApiProperty({ name: 'walletAddress', type: String })
  @Prop({ required: true, unique: true })
  walletAddress: string;

  @ApiProperty({ name: 'bloodGroup', type: String })
  @Prop()
  bloodGroup: string;

  @ApiProperty({ name: 'genotype', type: String })
  @Prop()
  genotype: string;

  @ApiProperty({ name: 'medicalRecords', type: [MedicalRecordDto] })
  medicalRecords: MedicalRecordDto[];

  @ApiProperty({ name: 'prescriptions', type: [PrescriptionDto] })
  prescriptions: PrescriptionDto[];

  @ApiProperty({ name: 'familyMembers', type: [FamilyMemberDto] })
  familyMembers: FamilyMemberDto[];

  @ApiProperty({ name: 'patient', type: String, default: 'patient' })
  @Prop({ default: 'patient', required: true })
  category: string;

  @ApiProperty({ name: 'isVerified', type: Boolean })
  @Prop({ required: true })
  isVerified: boolean;

  @ApiProperty({ name: '_id', type: Types.ObjectId })
  @Prop()
  _id: Types.ObjectId;
}

export class UpdatePatientProfileDto {
  @ApiPropertyOptional({ name: 'name', type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ name: 'lastName', type: String })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ name: 'age', type: String })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiPropertyOptional({ name: 'email', type: String })
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ name: 'phoneNo', type: String })
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNo?: string;

  @ApiPropertyOptional({ name: 'profilePicture', type: String })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({ name: 'address', type: String })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ name: 'city', type: String })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ name: 'bloodGroup', type: String })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiPropertyOptional({ name: 'genotype', type: String })
  @IsOptional()
  @IsString()
  genotype?: string;
}

export class CreateFamilyMemberDto {
  @ApiProperty({ name: 'id', description: 'blockchainId', type: Number })
  @IsNumber()
  id: number;

  @ApiProperty({ name: 'name', type: String })
  @IsString()
  name: string;

  @ApiPropertyOptional({ name: 'profilePicture', type: String })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({ name: 'relationship', type: String })
  @IsString()
  relationship: string;

  @ApiPropertyOptional({ name: 'email', type: String })
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ name: 'address', type: String })
  @IsString()
  address: string;

  @ApiProperty({ name: 'age', type: Number })
  @IsNumber()
  age: number;

  @ApiProperty({ name: 'dob', type: String })
  @IsString()
  dob: string;

  @ApiProperty({ name: 'bloodGroup', type: String })
  @IsString()
  bloodGroup: string;

  @ApiProperty({ name: 'genotype', type: String })
  @IsString()
  genotype: string;
}

export class UpdateFamilyMemberDto {
  @ApiPropertyOptional({ name: 'name', type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ name: 'profilePicture', type: String })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({ name: 'relationship', type: String })
  @IsOptional()
  @IsString()
  relationship?: string;

  @ApiPropertyOptional({ name: 'email', type: String })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ name: 'address', type: String })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ name: 'age', type: Number })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({ name: 'dob', type: Date })
  @IsOptional()
  @IsDate()
  dob?: Date;

  @ApiPropertyOptional({ name: 'bloodGroup', type: String })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiPropertyOptional({ name: 'genotype', type: String })
  @IsOptional()
  @IsString()
  genotype?: string;
}

export class SharePrescriptionDto {
  @ApiProperty({
    name: 'prescriptionId',
    description: 'mongo id',
    type: Types.ObjectId,
  })
  @IsMongoId()
  prescriptionId: Types.ObjectId;
}

export class CreateApprovalDto {
  @ApiPropertyOptional({
    name: 'recordId',
    description: 'an optional array of record id',
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  recordId?: number[];

  @ApiProperty({
    name: 'doctorAddress',
    description: 'doctor ethereum address',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  doctorAddress: string;

  @ApiProperty({ name: 'approvalType', type: String })
  @IsNotEmpty()
  @IsString()
  approvalType: TApprovalType;

  @ApiProperty({ name: 'approvalDurationInSec', type: Number })
  @IsNotEmpty()
  @IsNumber()
  approvalDurationInSec: number;
}

export class CreateFamilyMemberApprovalDto {
  @ApiProperty({
    name: 'familyMemberId',
    description: 'family member blockchain id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  familyMemberId: number;

  @ApiPropertyOptional({
    name: 'recordId',
    description: 'an optional array of record id',
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  recordId?: number[];

  @ApiProperty({
    name: 'doctorAddress',
    description: 'doctor ethereum address',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  doctorAddress: string;

  @ApiProperty({ name: 'approvalType', type: String })
  @IsNotEmpty()
  @IsString()
  approvalType: TApprovalType;

  @ApiProperty({ name: 'approvalDurationInSec', type: Number })
  @IsNotEmpty()
  @IsNumber()
  approvalDurationInSec: number;
}
