import { Prop } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNumber,
  IsEnum,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  age: number;

  @IsEmail()
  @Prop({ required: true })
  email: string;

  @IsEnum(['INTERN', 'EMPLOYEE'], {
    message: 'valid role required',
  })
  role: 'INTERN' | 'EMPLOYEE';
}
