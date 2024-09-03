import { drugClasses } from '@/shared/constants';
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

  @Prop({ required: true })
  price: string;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);

@Schema()
export class Medication extends Document {
  @Prop({ required: true })
  productPrescribed: string;

  @Prop({ required: true })
  productCategory: string;

  @Prop({ required: true })
  productDosage: string;

  @Prop()
  practitionerNote: string;

  @Prop({ default: new Date(Date.now()) })
  date: Date;

  @Prop({ default: false })
  isDispensed: boolean;

  @Prop()
  receipt: Receipt;
}

export const MedicineSchema = SchemaFactory.createForClass(Medication);

@Schema()
export class MedicineCategories {
  @Prop({ default: drugClasses })
  category?: string[];
}

export const MedicineCategoriesSchema =
  SchemaFactory.createForClass(MedicineCategories);
