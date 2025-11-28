import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzleORM } from './theDrizzleORM';
import {drizzle}  from "drizzle-orm/node-postgres"
import * as productsSchema from  "../products/schema"
import * as categoriesSchema from  "../categories/schema"
import {Pool} from "pg"

@Global()   // globall access to DRIZZLEORM : no import(where it's used)
@Module({
    providers:[
        {
            provide:drizzleORM,
            useFactory:(configService:ConfigService)=>{
                const pool = new Pool({                     // DB CONNECTION
                    connectionString : configService.getOrThrow("DATABASE_URL")
                })
               return drizzle(pool,{                        // SCHEMA utilized in :
                    schema:{
                        ...productsSchema,
                        ...categoriesSchema
                    }
                })
            },
            inject:[ConfigService]
        }
    ],
    exports:[drizzleORM]
})
export class DrizzleModule {}
