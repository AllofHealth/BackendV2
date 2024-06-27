import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEthereumAddress,
  IsNumber,
} from 'class-validator';

export class CreateHospitalDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  admin: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNo: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateHospitalProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNo?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}

export class JoinHospitalDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  @IsString()
  walletAddress: string;
}

export class RemovePractitionerDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  @IsString()
  walletAddress: string;
}

export class ApprovePractitionerDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;
}
