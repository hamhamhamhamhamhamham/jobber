import { Module } from '@nestjs/common';

import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@jobber/nestjs';
import { ProductsModule } from './jobs/products/products.module';
@Module({
  imports: [
    ProductsModule,
    LoggerModule,
    JobsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
