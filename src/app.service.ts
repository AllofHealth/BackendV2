import { Injectable } from '@nestjs/common';
import { MyLoggerService } from './modules/my-logger/my-logger.service';

@Injectable()
export class AppService {
  constructor() {}
  private readonly logger = new MyLoggerService(AppService.name);

  sayHello() {
    const message = 'Hello World!';
    this.logger.log(message);
    return message;
  }
}
