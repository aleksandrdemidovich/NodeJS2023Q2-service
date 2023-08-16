import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  LOGGING_LEVEL,
  errorLogFileName,
  logDirectory,
  logFileName,
} from './logConstants';
import { readdir, mkdir, appendFile } from 'fs/promises';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private loggingLevel: number;
  private logFileName: string = `log${new Date()
    .toISOString()
    .replace(/:/g, '-')}.log`;

  constructor() {
    super();
    this.loggingLevel = LOGGING_LEVEL;
  }

  private async writeToFile(fileName: string, message: string) {
    const logFolder = `${process.cwd()}/${logDirectory}/`;

    try {
      await readdir(logFolder);
    } catch (err) {
      await mkdir(logFolder, { recursive: true });
    }

    const source = `${logFolder}${fileName}`;

    const line = message + '\r\n';
    await appendFile(source, line);
  }
  async log(message: string) {
    await this.writeToFile(this.logFileName, message);
    super.log(message);
  }

  async error(message: any) {
    if (this.loggingLevel > 0) {
      await this.writeToFile(errorLogFileName, message);
      super.error(message);
    }
  }

  async warn(message: any) {
    if (this.loggingLevel > 1) {
      await this.writeToFile(this.logFileName, message);
      super.warn(message);
    }
  }

  async debug(message: any) {
    if (this.loggingLevel > 2) {
      await this.writeToFile(this.logFileName, message);
      super.debug(message);
    }
  }

  async verbose(message: any) {
    if (this.loggingLevel === 4) {
      await this.writeToFile(this.logFileName, message);
      super.verbose(message);
    }
  }
}
