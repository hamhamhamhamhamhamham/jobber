import { Module } from '@nestjs/common';
import { ProductsConsumer } from './products-consumer';
import { PulsarModule } from '@jobber/pulsar';




import { ClientsModule, Transport} from "@nestjs/microservices"
import {PackageName} from "@jobber/grpc"
import { join } from 'path';


import { ConfigService } from '@nestjs/config';

@Module({
  imports:[PulsarModule,ClientsModule.registerAsync([
    // کلاینت >> SENDER
    {
        // name > (any value can be)
      name:PackageName.PRODUCTS, //INJECTION TOKEN > use @Inject() ->look libs!
      useFactory:(configService:ConfigService)=>({
        transport:Transport.GRPC,
        options:{
        // grpc CONFIGS again!
        url:configService.getOrThrow("PRODUCTS_GRPC_SERVICE_URL"), 
        package:PackageName.PRODUCTS,        
        protoPath:join(__dirname,'../../libs/grpc/proto/products.proto') // refers to DIST proto in production and libs proto in development! 
      }
      }),
      inject:[ConfigService]
    }
  ])], // یادت نره
  providers: [ProductsConsumer],
})
export class ProductsModule {}
