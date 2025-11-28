require('module-alias/register')
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { init } from '@jobber/nestjs';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PackageName } from '@jobber/grpc';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ 
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // همه سطوح روشن
    bufferLogs:true // PINNO LOGGER
  });
  await init(app)

    // grpc SErver (executor -> CLIENT!)
    app.connectMicroservice<GrpcOptions>({ 
    transport:Transport.GRPC, // Transportlayer Options
    options:{
      url:  app.get(ConfigService).getOrThrow("PRODUCTS_GRPC_SERVICE_URL"),
      package:PackageName.PRODUCTS,
      protoPath:join(__dirname,'../../libs/grpc/proto/products.proto') 
    }
  }) 
  await app.startAllMicroservices() // start grpc Server
}

bootstrap();
