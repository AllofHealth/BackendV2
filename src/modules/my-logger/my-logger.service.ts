import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      timeZone: 'WAT',
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date())}\t${entry}\n`;

    try {
      const pathExist = fs.existsSync(path.join(__dirname, '..', '..', 'logs'));
      if (!pathExist) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e);
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    await this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;
    await this.logToFile(entry);
    super.error(message, stackOrContext);
  }

  info(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    await this.logToFile(entry);
    super.verbose(message, context);
  }
}
