import {
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import {
  Prescriptions,
  PrescriptionsSchema,
} from '@/modules/patient/schemas/patient.schema';
import {
  ApprovalList,
  ApprovalListSchema,
  Inventory,
  InventorySchema,
} from '@/modules/pharmacist/schema/pharmacist.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreatePharmacistDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  hospitalIds?: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: IsEmail })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;
}

export class PharmacistDto {
  @ApiProperty({ type: Number })
  @Prop({ required: true, unique: true })
  id: number;

  @ApiProperty({ type: [Number] })
  @Prop([Number])
  hospitalIds: number[];

  @ApiProperty({ type: Number })
  @Prop({ required: true, default: 0 })
  numberOfApprovals: number;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ type: String })
  @Prop()
  email?: string;

  @ApiPropertyOptional({ type: String })
  @Prop()
  about?: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  profilePicture: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  location: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  phoneNumber: string;

  @ApiProperty({ type: String })
  @Prop({ required: true, unique: true })
  walletAddress: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  status: string;

  @ApiProperty({ type: InventorySchema })
  @Prop({ type: InventorySchema })
  inventory: Inventory;

  @ApiProperty({ type: [ApprovalListSchema] })
  @Prop({ type: [{ type: ApprovalListSchema }] })
  approvalList: ApprovalList[];

  @ApiProperty({ type: [PrescriptionsSchema] })
  @Prop({ type: [{ type: PrescriptionsSchema }] })
  sharedPrescriptions: Prescriptions[];

  @ApiProperty({ type: String, default: 'pharmacist' })
  @Prop({ default: 'pharmacist', required: true })
  category: string;

  @ApiProperty({ type: Boolean })
  @Prop({ required: true })
  isVerified: boolean;

  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;
}

export class UpdatePharmacistDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  about?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class AddMedicineDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  sideEffects?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  category: string;
}

export class UpdateMedicineDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  sideEffects?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  image?: string;
}

export class DispenseMedicationDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  productToDispense: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  directions: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  medicineId: string;
}