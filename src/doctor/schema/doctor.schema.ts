import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Approval extends Document {
  @Prop({ required: true })
  patientId: number;

  @Prop({ required: true })
  patientName: string;

  @Prop()
  recordId: number;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ required: true })
  patientAddress: string;

  @Prop({ required: true })
  approvalType: string;

  @Prop({ required: true })
  approvalStatus: string;

  @Prop({ required: true })
  approvalTime: Date;

  @Prop({ required: true })
  recordOwner: string;
}

export const ApprovalSchema = SchemaFactory.createForClass(Approval);

export type DoctorDocument = HydratedDocument<Doctor>;
@Schema()
export class Doctor {
  @Prop({ required: true, unique: true, sparse: true })
  id: number;

  @Prop([Number])
  hospitalIds: number[];

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop({ default: 0 })
  numberOfApprovals: number;

  @Prop([ApprovalSchema])
  activeApprovals: Approval[];

  @Prop({ default: 'pending', required: true })
  status: string;

  @Prop({ default: 'doctor', required: true })
  category: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
