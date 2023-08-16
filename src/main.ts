import * as dotenv from 'dotenv';
dotenv.config();
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './errors/exception.filter';
import { addListeners } from './errors/exceptionListener';
import { LoggerService } from './logger/logger.service';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new Logger(AppModule.name),
  });

  const file = fs.readFileSync('./doc/api.yaml', 'utf8');
  const swaggerDocument = parse(file);

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.useGlobalPipes(new ValidationPipe());
  
  const logger = new LoggerService();
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  addListeners(logger);
  await app.listen(PORT);

  //Test uncaughtException/unhandledRejection

  // setTimeout(() => {
  //   throw new Error('uncaughtException test');
  // }, 1000);

  // setTimeout(
  //   () => Promise.reject(new Error('unhandledRejection test')),
  //  1000,
  // );
}
bootstrap();
