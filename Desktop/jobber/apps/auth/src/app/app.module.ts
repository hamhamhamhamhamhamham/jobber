import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from '@jobber/nestjs';
import { GqlLoggerPlugin } from '@jobber/graphql';

@Module({
  imports: [     
    LoggerModule, // PINNO LOGGER
    // install globally -> ConfigService unlocked!
    ConfigModule.forRoot({
      isGlobal:true  // 👈 این کلید جادوییه     
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      plugins:[new GqlLoggerPlugin()], // PINNO LOGGER
      driver: ApolloDriver,
      playground:{
        settings:{
          'request.credentials': 'include'
        } 
      },
      context:({req,res}) => ({req,res}),  // enable context.req 
      autoSchemaFile: true, // auto conversion(graphql decorators to graphql schema by apolloserver)
    }),
    PrismaModule, 
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
