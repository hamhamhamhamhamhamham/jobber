/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({whitelist:true})) // activate validation(class-validator)
  app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3000;

  //✔️middleware(.user()) > RUNS before route called(resolver(mutation&query))
  app.use(cookieParser())   //   for parsing request for cookie!
  const port = app.get(ConfigService).getOrThrow("PORT")

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
