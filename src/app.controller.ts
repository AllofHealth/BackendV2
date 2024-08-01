import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from './modules/my-logger/my-logger.service';

@SkipThrottle()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: MyLoggerService,
  ) {}

  @Get()
  getMessage() {
    return this.appService.sayHello();
  }
}
