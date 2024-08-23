import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Receipt extends Document {
  @Prop({ required: true })
  productDispensed: string;

  @Prop({ required: true, default: new Date(Date.now()) })
  dateDispensed: Date;

  @Prop({ required: true })
  directions: string;

  @Prop({ required: true })
  quantity: string;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);

@Schema()
export class Medicine extends Document {
  @Prop({ required: true })
  productPrescribed: string;

  @Prop({ required: true })
  productCategory: string;

  @Prop()
  practitionerNote: string;

  @Prop({ default: new Date(Date.now()) })
  date: Date;

  @Prop({ default: false })
  isDispensed: boolean;

  @Prop()
  receipt: Receipt;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
