import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  profilePicture: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop({ default: 'admin', required: true })
  category: string;

  @Prop({ required: true })
  isVerified: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
