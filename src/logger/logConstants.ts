export const LOGGING_LEVELS = ['log', 'error', 'warn', 'verbose', 'debug'];
export const LOGGING_LEVEL = +process.env.LOGGING_LEVEL || 4;

export const logDirectory = 'logs';
export const errorLogFileName = 'error.log';
export const logFileName = `log.log`;

export const maxLogFileSize = 1024 * 1024;
