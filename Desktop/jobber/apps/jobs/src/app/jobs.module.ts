import { Module } from '@nestjs/common';

import { FibonacciJobProvider } from './jobs/fibonacci/fibonacci.job.provider';
import { JobsService } from './jobs.service';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport} from "@nestjs/microservices"
import {PackageName} from "@jobber/grpc"
import { join } from 'path';
import { GqlAuthGuard } from '@jobber/graphql';
import { PulsarModule } from '@jobber/pulsar';
import { ConfigService } from '@nestjs/config';
import { ProductsJobProvider } from './jobs/products/products.job.provider';
@Module({
  imports: [PulsarModule,DiscoveryModule,ClientsModule.registerAsync([
    // کلاینت >> SENDER
    {
        // name > (any value can be)
      name:PackageName.AUTH, //INJECTION TOKEN > use @Inject() ->look libs!
      useFactory:(configService:ConfigService)=>({
        transport:Transport.GRPC,
        options:{
        // grpc CONFIGS again!
        url:configService.getOrThrow("AUTH_GRPC_SERVICE_URL"),
        package:PackageName.AUTH,        
        protoPath:join(__dirname,'../../libs/grpc/proto/auth.proto') // refers to DIST proto in production and libs proto in development! 
      }
      }),
      inject:[ConfigService]
    }
  ])],
  providers: [ProductsJobProvider,FibonacciJobProvider, JobsService, JobsResolver,GqlAuthGuard], 
})
export class JobsModule {}
