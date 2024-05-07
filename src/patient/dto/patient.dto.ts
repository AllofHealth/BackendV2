import {
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
