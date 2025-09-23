/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

import cookieParser from "cookie-parser"
import { ConfigService } from '@nestjs/config';
export async function init(app:INestApplication) {
  
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser())   //   for parsing request for cookie!
  const port = app.get(ConfigService).getOrThrow("PORT")
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}


