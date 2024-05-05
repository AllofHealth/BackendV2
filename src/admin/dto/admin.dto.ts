import {
  IsEmail,
  IsEthereumAddress,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class ApproveHospitalDto {
  @IsMongoId()
  hospitalId: Types.ObjectId;

  @IsString()
  @IsEthereumAddress()
  @IsNotEmpty()
  adminAddress: string;
}

export class CreateAdminDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEthereumAddress()
  @IsNotEmpty()
  walletAddress: string;
}

export class RemoveAdminDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  adminAddressToAuthorize: string;

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  adminAddressToRemove: string;
}
