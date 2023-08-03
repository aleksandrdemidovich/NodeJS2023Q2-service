import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const file = fs.readFileSync('./doc/api.yaml', 'utf8');
  const swaggerDocument = parse(file);

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
