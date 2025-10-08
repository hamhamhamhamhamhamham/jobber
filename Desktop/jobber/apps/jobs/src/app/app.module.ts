import { Module } from '@nestjs/common';
import { JobsModule } from './jobs.module';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule} from "@nestjs/graphql" 
import {ApolloDriver,ApolloDriverConfig} from "@nestjs/apollo"
import { LoggerModule } from '@jobber/nestjs';
import { GqlLoggerPlugin } from '@jobber/graphql';
@Module({
  imports: [
    LoggerModule,  // PINO LOGGER
    GraphQLModule.forRoot<ApolloDriverConfig>({
      plugins:[new GqlLoggerPlugin()], // PINO LOGGER
      driver:ApolloDriver,
      playground:{
        settings:{
          "request.credentials":'include'
        }
      },
      autoSchemaFile:true
    })
    ,ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
