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

export class CreatePharmacistDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  hospitalIds?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

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
}

export class UpdatePharmacistDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class AddMedicineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsString()
  sideEffects?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}

export class UpdateMedicineDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  sideEffects?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class DispenseMedicationDto {
  @IsNotEmpty()
  @IsString()
  productToDispense: string;

  @IsNotEmpty()
  @IsString()
  directions: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  medicineId: string;
}
