import { AppService } from './app.service';
import { MyLoggerService } from './my-logger/my-logger.service';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService, logger: MyLoggerService);
    getMessage(): string;
}
