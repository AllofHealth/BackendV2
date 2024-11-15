import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Escrow {}

export const EscrowSchema = SchemaFactory.createForClass(Escrow);