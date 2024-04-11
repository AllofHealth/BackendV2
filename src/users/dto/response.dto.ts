import { IsNumber, IsObject, IsString } from 'class-validator';

export class ResponseDto {
  @IsString()
  @IsObject()
  response: string | object;

  @IsNumber()
  statusCode: number;

  @IsString()
  path: string;
}
