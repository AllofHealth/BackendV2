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
  regNo: string;

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
