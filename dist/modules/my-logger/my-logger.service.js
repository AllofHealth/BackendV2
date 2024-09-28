"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLoggerService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
let MyLoggerService = class MyLoggerService extends common_1.ConsoleLogger {
    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            timeZone: 'Africa/Lagos',
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(new Date())}\t${entry}\n`;
        try {
            const logsDir = path.resolve(__dirname, '..', '..', 'logs');
            const pathExist = fs.existsSync(logsDir);
            if (!pathExist) {
                await fsPromises.mkdir(logsDir, { recursive: true });
                console.log(`creating path`);
            }
            const logFilePath = path.join(logsDir, 'myLogFile.log');
            await fsPromises.appendFile(logFilePath, formattedEntry);
            console.log(`log written to path ${logFilePath}`);
        }
        catch (e) {
            console.error('Error writing to the log file:', e);
        }
    }
    log(message, context) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(message, context);
    }
    error(message, stackOrContext) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }
    info(message, context) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.verbose(message, context);
    }
};
exports.MyLoggerService = MyLoggerService;
exports.MyLoggerService = MyLoggerService = __decorate([
    (0, common_1.Injectable)()
], MyLoggerService);
//# sourceMappingURL=my-logger.service.js.map