import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ReceiptDto } from '@/modules/patient/dto/patient.dto';

export class MedicineDto {
  @ApiProperty({ type: String })
  @Prop({ required: true })
  productPrescribed: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  productCategory: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  productDosage: string;

  @ApiPropertyOptional({ type: String })
  @Prop()
  practitionerNote: string;

  @ApiProperty({ type: Date })
  @Prop({ default: new Date(Date.now()) })
  date: Date;

  @ApiProperty({ type: Boolean, default: false })
  @Prop({ default: false })
  isDispensed: boolean;

  @ApiPropertyOptional({ type: ReceiptDto })
  @Prop()
  receipt: ReceiptDto;

  @ApiProperty({ type: Types.ObjectId })
  _id: Types.ObjectId;
}
