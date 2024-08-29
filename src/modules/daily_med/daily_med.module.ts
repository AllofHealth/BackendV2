import { Module } from '@nestjs/common';
import { DailyMedService } from './service/daily_med.service';
import { DailyMedProvider } from './provider/daily_med.provider';
import { DailyMedController } from './controller/daily_med.controller';

@Module({
  providers: [DailyMedService, DailyMedProvider],
  controllers: [DailyMedController],
  exports: [DailyMedService],
})
export class DailyMedModule {}
