import { Module } from '@nestjs/common';

import { FibonacciJobProvider } from './jobs/fibonacci/fibonacci.job.provider';
import { JobsService } from './jobs.service';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport} from "@nestjs/microservices"
import {AUTH_PACKAGE_NAME} from "types/proto/auth"
import { join } from 'path';
import { GqlAuthGuard } from '@jobber/nestjs';
import { PulsarModule } from '@pulsar-lib';
@Module({
  imports: [PulsarModule,DiscoveryModule,ClientsModule.register([
    // کلاینت >> SENDER
    {
        // name > (any value can be)
      name:AUTH_PACKAGE_NAME, //INJECTION TOKEN > use @Inject() ->look libs!
      transport:Transport.GRPC,
      options:{
        // grpc CONFIGS again!
        package:AUTH_PACKAGE_NAME,        
        protoPath:join(__dirname,'proto/auth.proto')
      }
    }
  ])],
  providers: [FibonacciJobProvider, JobsService, JobsResolver,GqlAuthGuard], 
})
export class JobsModule {}
