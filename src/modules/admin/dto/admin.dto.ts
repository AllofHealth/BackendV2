import {
  IsEmail,
  IsEthereumAddress,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApproveHospitalDto {
  @ApiProperty({
    description: 'hospital mongo uuid',
    type: Types.ObjectId,
  })
  @IsMongoId()
  hospitalId: Types.ObjectId;

  @ApiProperty({
    description: 'admin ethereum address',
    type: String,
  })
  @IsString()
  @IsEthereumAddress()
  @IsNotEmpty()
  adminAddress: string;
}

export class CreateAdminDto {
  @ApiProperty({
    description: 'admin name',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'profile picture url',
    type: String,
  })
  @IsUrl()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({
    description: 'email address',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'admin ethereum address',
    type: String,
  })
  @IsEthereumAddress()
  @IsNotEmpty()
  walletAddress: string;
}

export class RemoveAdminDto {
  @ApiProperty({
    description: 'admin ethereum address to authorize',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  adminAddressToAuthorize: string;

  @ApiProperty({
    description: 'admin ethereum address to remove',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  adminAddressToRemove: string;
}

export class UpdateAdminDto {
  @ApiPropertyOptional({
    description: 'admin name',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'profile picture url',
    type: String,
  })
  @IsOptional()
  @IsUrl()
  profilePicture?: string;

  @ApiPropertyOptional({
    description: 'admin email',
    type: String,
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
