import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ReceiptDto } from '@/modules/patient/dto/patient.dto';

export class MedicineDto {
  @ApiProperty({ type: String })
  productPrescribed: string;

  @ApiProperty({ type: String })
  productCategory: string;

  @ApiProperty({ type: String })
  productDosage: string;

  @ApiPropertyOptional({ type: String })
  practitionerNote: string;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ type: Boolean, default: false })
  isDispensed: boolean;

  @ApiPropertyOptional({ type: ReceiptDto })
  receipt: ReceiptDto;

  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;
}
