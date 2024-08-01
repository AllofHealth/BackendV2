import { Module } from '@nestjs/common';
import { TermillService } from './service/termill.service';
import { TermillProvider } from './dao/termill.dao';

@Module({
  providers: [TermillService, TermillProvider],
  exports: [TermillService],
})
export class TermillModule {}
