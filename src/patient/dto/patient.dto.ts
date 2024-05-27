import {
  IsDate,
  IsEmail,
  IsEthereumAddress,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  @IsEthereumAddress()
  walletAddress: string;

  @IsString()
  bloodGroup: string;

  @IsString()
  genotype: string;

  @IsOptional()
  @IsString()
  category?: string;
}

export class UpdatePatientProfileDto {
  @IsString()
  @IsEthereumAddress()
  walletAddress: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  age?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsString()
  genotype?: string;
}

export class CreateFamilyMemberDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  principalPatient?: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  relationship: string;

  @IsEmail()
  @IsOptional()
  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsNumber()
  age: number;

  @IsString()
  dob: string;

  @IsString()
  bloodGroup: string;

  @IsString()
  genotype: string;
}

export class UpdateFamilyMemberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  relationship?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsString()
  genotype?: string;
}
