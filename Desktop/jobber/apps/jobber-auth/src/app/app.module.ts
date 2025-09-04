import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [     // install globally -> ConfigService unlocked!
    ConfigModule.forRoot({
      isGlobal:true  // 👈 این کلید جادوییه     
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground:{
        settings:{
          'request.credentials': 'include'
        } 
      },
      context:({req,res}) => ({req,res}), // context.req > available
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
