import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Prescriptions,
  PrescriptionsSchema,
} from '@/modules/patient/schemas/patient.schema';

@Schema()
export class ApprovalList {
  @Prop({ required: true })
  patientId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  recordId: number;

  @Prop()
  profilePicture?: string;

  @Prop({ required: true })
  patientAddress: string;

  @Prop({ required: true })
  doctorAddress: string;

  @Prop({ required: true })
  approvalType: string;

  @Prop({ required: true })
  recordOwner: string;
}

export const ApprovalListSchema = SchemaFactory.createForClass(ApprovalList);

@Schema()
export class Medicine {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  sideEffects?: string;

  @Prop()
  image?: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);

@Schema()
export class Product {
  @Prop({ required: true })
  category: string;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: MedicineSchema }] })
  medications: Medicine[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

@Schema()
export class Inventory {
  @Prop({ default: 0 })
  numberOfMedicine?: number;

  @Prop({ default: 0 })
  numberOfCategories?: number;

  @Prop({ default: 0 })
  numberOfMedicineSold?: number;

  @Prop({ type: [{ type: ProductSchema }], unique: true })
  products: Product[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

export type PharmacistDocument = HydratedDocument<Pharmacist>;
@Schema()
export class Pharmacist {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop([Number])
  hospitalIds: number[];

  @Prop({ required: true, default: 0 })
  numberOfApprovals: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop()
  about?: string;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: InventorySchema })
  inventory: Inventory;

  @Prop({ type: [{ type: ApprovalListSchema }] })
  approvalList: ApprovalList[];

  @Prop({ type: [{ type: PrescriptionsSchema }] })
  sharedPrescriptions: Prescriptions[];

  @Prop({ default: 'pharmacist', required: true })
  category: string;

  @Prop({ required: true })
  isVerified: boolean;
}

export const PharmacistSchema = SchemaFactory.createForClass(Pharmacist);
