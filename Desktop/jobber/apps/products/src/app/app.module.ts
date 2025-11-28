import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from '@jobber/nestjs';
import { ProductsModule } from './products/products.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    DrizzleModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
