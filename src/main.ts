import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import express = require('express');
import { join } from 'path';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const db_name = configService.get<string>('POSTGRES_DATABASE');

  SwaggerModule.setup('api', app, createDocument(app));
  app.useGlobalPipes(new ValidationPipe());
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.enableCors({
    origin: '*', // change it with FRONTEND_URL
    credentials: true,
  });
  logger.verbose(`Starting application on port ${port}`);
  logger.verbose(`Database name: ${db_name}`);
  await app.listen(port);
}
bootstrap();
