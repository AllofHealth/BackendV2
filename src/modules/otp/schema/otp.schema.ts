import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Otp extends Document {
  @Prop({ required: true })
  walletAddress: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  expirationTime: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
