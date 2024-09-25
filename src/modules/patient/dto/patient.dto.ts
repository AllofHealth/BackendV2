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
  approvalType: string;

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
  approvalType: string;

  @ApiProperty({ name: 'approvalDurationInSec', type: Number })
  @IsNotEmpty()
  @IsNumber()
  approvalDurationInSec: number;
}
