import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type MedicalRecordPreviewDocument = MedicalRecordPreview & Document;

@Schema()
export class MedicalRecordPreview extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  principalPatient: string;

  @Prop()
  diagnosis: string;

  @Prop({ required: true })
  doctorsName: string;

  @Prop({ required: true })
  hospitalName: string;

  @Prop({ required: true })
  date: Date;
}

export const MedicalRecordPreviewSchema =
  SchemaFactory.createForClass(MedicalRecordPreview);

@Schema()
export class Prescriptions extends Document {
  @Prop({ required: true })
  doctorName: string;

  @Prop({ required: true })
  recordId: number;

  @Prop({ required: true })
  patientAddress: string;

  @Prop({ required: true })
  doctorAddress: string;

  @Prop({ required: true })
  medicineName: string;

  @Prop()
  medicineId?: string;

  @Prop()
  medicineGroup?: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  sideEffects: string;

  @Prop({ default: Date.now() })
  date: Date;
}

export const PrescriptionsSchema = SchemaFactory.createForClass(Prescriptions);
@Schema()
export class FamilyMember extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  principalPatient: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  relationship: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  age: number;

  @Prop({ sparse: true })
  dob: Date;

  @Prop({ required: true })
  bloodGroup: string;

  @Prop({ required: true })
  genotype: string;

  @Prop({ type: [{ type: MedicalRecordPreviewSchema }] })
  medicalRecord: MedicalRecordPreviewDocument[];
}

export const FamilyMemberSchema = SchemaFactory.createForClass(FamilyMember);

export type PatientDocument = HydratedDocument<Patient>;
@Schema()
export class Patient {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  appointmentCount: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  email: string;

  @Prop()
  profilePicture: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop({ required: true })
  bloodGroup: string;

  @Prop({ required: true })
  genotype: string;

  @Prop({ type: [{ type: MedicalRecordPreviewSchema, unique: true }] })
  medicalRecords: MedicalRecordPreviewDocument[];

  @Prop({ type: [{ type: PrescriptionsSchema, unique: true }] })
  prescriptions: Prescriptions[];

  @Prop({ type: [{ type: FamilyMemberSchema, unique: true }] })
  familyMembers: FamilyMember[];

  @Prop({ default: 'patient', required: true })
  category: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
