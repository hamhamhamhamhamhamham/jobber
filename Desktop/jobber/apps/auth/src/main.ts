require('module-alias/register')
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import {GrpcOptions,Transport} from "@nestjs/microservices"
import { join } from 'path';
import {PackageName} from "@jobber/grpc"
import { init } from '@jobber/nestjs';
import {ConfigService} from "@nestjs/config"



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // همه سطوح روشن
    bufferLogs:true // PINNO LOGGER
  });
  
  await init(app)

  app.connectMicroservice<GrpcOptions>({ 
    transport:Transport.GRPC, // Transportlayer Options
    options:{
      url:  app.get(ConfigService).getOrThrow("AUTH_GRPC_SERVICE_URL"),
      package:PackageName.AUTH,
      protoPath:join(__dirname,'../../libs/grpc/proto/auth.proto') 
    }
  }) 
  await app.startAllMicroservices() // start grpc Server
  
}

bootstrap();
