import { LoggerService } from 'src/logger/logger.service';

export const addErrorListeners = (logger: LoggerService): void => {
  process
    .on('unhandledRejection', async () => {
      logger.error('Unhandled Rejection... Server will be restarted');
    })
    .on('uncaughtException', async () => {
      logger.error('Uncaught Exception... Server will be restarted');
    });
};
