require('module-alias/register')
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import {GrpcOptions,Transport} from "@nestjs/microservices"
import { join } from 'path';
import {AUTH_PACKAGE_NAME} from "@jobber/grpc"
import { init } from '@jobber/nestjs';




async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // همه سطوح روشن
    bufferLogs:true // PINNO LOGGER
  });
  
  await init(app)

  app.connectMicroservice<GrpcOptions>({ 
    transport:Transport.GRPC, // Transportlayer Options
    options:{
      package:AUTH_PACKAGE_NAME,
      protoPath:join(__dirname,'../../libs/grpc/proto/auth.proto') 
    }
  }) 
  await app.startAllMicroservices() // start grpc Server
  
}

bootstrap();
