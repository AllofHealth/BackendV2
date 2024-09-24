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
