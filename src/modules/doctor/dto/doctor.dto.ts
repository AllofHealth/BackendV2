import {
  IsArray,
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { AddMedicineType } from '../interface/doctor.interface';
import { Prop } from '@nestjs/mongoose';
import {
  Approval,
  ApprovalSchema,
} from '@/modules/doctor/schema/doctor.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateDoctorDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsOptional()
  hospitalIds: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsUrl()
  @IsOptional()
  profilePicture: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;

  @IsString()
  @IsOptional()
  status: string;
}

export class DoctorDto {
  @ApiProperty({ type: Number })
  @Prop({ required: true, unique: true, sparse: true })
  id: number;

  @ApiProperty({ type: [Number] })
  @Prop([Number])
  hospitalIds: number[];

  @ApiProperty({ type: String })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ type: String })
  @Prop()
  email: string;

  @ApiPropertyOptional({ type: String })
  @Prop()
  about: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  profilePicture: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  specialty: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  location: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  phoneNumber: string;

  @ApiProperty({ type: String })
  @Prop({ required: true, unique: true })
  walletAddress: string;

  @ApiProperty({ type: Number, default: 0 })
  @Prop({ default: 0 })
  numberOfApprovals: number;

  @ApiProperty({ type: [ApprovalSchema] })
  @Prop({ type: [{ type: ApprovalSchema, unique: true }] })
  activeApprovals: Approval[];

  @ApiProperty({ type: Number, default: 'pending' })
  @Prop({ default: 'pending', required: true })
  status: string;

  @ApiProperty({ type: Number, default: 'doctor' })
  @Prop({ default: 'doctor', required: true })
  category: string;

  @ApiProperty({ type: Boolean, default: false })
  @Prop({ required: true })
  isVerified: boolean;

  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;
}

export class UpdateDoctorDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsUrl()
  @IsOptional()
  profilePicture: string;

  @IsString()
  @IsOptional()
  specialty: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class CreatePrescriptionDto {
  @IsNumber()
  @IsNotEmpty()
  recordId: number;

  @IsArray()
  @IsOptional()
  medicine: AddMedicineType[];
}

export class CreateMedicalRecordDto {
  @IsNumber()
  @IsNotEmpty()
  recordId: number;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;
}
