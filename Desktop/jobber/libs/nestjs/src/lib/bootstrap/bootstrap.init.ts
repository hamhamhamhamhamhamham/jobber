/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Logger} from "nestjs-pino"
import cookieParser from "cookie-parser"
import { ConfigService } from '@nestjs/config';
export async function init(app:INestApplication) {
  
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.setGlobalPrefix(globalPrefix);
  app.useLogger(app.get(Logger))
  app.use(cookieParser())   //   for parsing request for cookie!
  const port = app.get(ConfigService).getOrThrow("PORT")
  await app.listen(port);
  app.get(Logger).log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}


