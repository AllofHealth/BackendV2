import { Module } from '@nestjs/common';
import { Escrow } from '@/modules/escrow/dao/escrow';
import { EscrowService } from './service/escrow.service';

@Module({
  providers: [Escrow, EscrowService],
})
export class EscrowModule {}