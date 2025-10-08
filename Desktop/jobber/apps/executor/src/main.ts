require('module-alias/register')
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {init} from "@jobber/nestjs"
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bufferLogs:true // PINNO LOGGER
  });
  await init(app)
}

bootstrap();
