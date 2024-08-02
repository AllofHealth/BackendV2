"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const my_logger_service_1 = require("./modules/my-logger/my-logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(my_logger_service_1.MyLoggerService));
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map