import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';
import {GraphQLModule} from "@nestjs/graphql" 
import {ApolloDriver,ApolloDriverConfig} from "@nestjs/apollo"
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
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
