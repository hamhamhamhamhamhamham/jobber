import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,           // install globally 
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile:true,    // auto conversion(graphql decorators to graphql schema by apolloserver)
    }),
  PrismaModule,
  UsersModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
