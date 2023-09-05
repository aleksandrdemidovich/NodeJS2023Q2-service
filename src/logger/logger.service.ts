import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendFile, mkdir, readdir, stat } from 'fs/promises';
import {
  LOGGING_LEVEL,
  errorLogFileName,
  logDirectory,
  maxLogFileSize,
} from './logConstants';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private loggingLevel: number;
  private logFileName = `log-${new Date()
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

    try {
      if (await this.fileExists(source)) {
        const { size } = await stat(source);
        if (size > maxLogFileSize) {
          const newLogFileName = `log-${new Date()
            .toISOString()
            .replace(/:/g, '-')}.log`;
          this.logFileName = newLogFileName;
          return;
        }
      }
    } catch (err) {
      throw new Error(err);
    }
    const line = message + '\r\n';
    await appendFile(source, line);
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await stat(filePath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  }

  async log(message: string) {
    await this.writeToFile(this.logFileName, '[LOG] ' + message);
    super.log(message);
  }

  async error(message: any) {
    if (this.loggingLevel > 0) {
      await this.writeToFile(errorLogFileName, '[ERROR] ' + message);
      super.error(message);
    }
  }

  async warn(message: any) {
    if (this.loggingLevel > 1) {
      await this.writeToFile(this.logFileName, '[WARN] ' + message);
      super.warn(message);
    }
  }

  async debug(message: any) {
    if (this.loggingLevel > 2) {
      await this.writeToFile(this.logFileName, '[DEBUG] ' + message);
      super.debug(message);
    }
  }

  async verbose(message: any) {
    if (this.loggingLevel === 4) {
      await this.writeToFile(this.logFileName, '[VERBOSE] ' + message);
      super.verbose(message);
    }
  }
}
